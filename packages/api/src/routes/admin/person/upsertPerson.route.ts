import { models } from "@openregistre/metadata/orm"
import { upsertPersonRouteDefinition } from "@openregistre/metadata/routes"
import { generateId } from "@openregistre/metadata/utilities"
import { eq } from "drizzle-orm"
import { checkApiKeyMiddleware } from "../../../middlewares/checkApiKey.middleware.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { routeHandler } from "../../../utilities/api/routeHandler.js"
import { Clients } from "../../../utilities/clients.js"
import { routeResponse } from "../../../utilities/route/routeResponse.js"


export const upsertPersonRoute = routeHandler({
    definition: upsertPersonRouteDefinition,
    handler: async ({ context }) => {
        await checkApiKeyMiddleware({ context })
        const body = await validateBodyMiddleware({
            context: context,
            schema: upsertPersonRouteDefinition.schemas.input,
        })

        // Look for existing persons with the same fullName
        const existing = await Clients.platformPostgresql
            .select()
            .from(models.person)
            .where(eq(models.person.fullName, body.fullName))

        // Ambiguous: multiple matches
        if (existing.length > 1) {
            // Flag all matching persons
            for (const person of existing) {
                await Clients.platformPostgresql
                    .update(models.person)
                    .set({ isFlagged: true, lastUpdatedAt: new Date().toISOString() })
                    .where(eq(models.person.id, person.id))
            }
            return routeResponse({
                context: context,
                statusCode: 200,
                bodyValue: {
                    id: existing[0].id,
                    isFlagged: true,
                },
            })
        }

        // Update existing
        if (existing.length === 1) {
            const updated = await Clients.platformPostgresql
                .update(models.person)
                .set({
                    fullName: body.fullName,
                    birthDate: body.birthDate ?? existing[0].birthDate,
                    photoUrl: body.photoUrl ?? existing[0].photoUrl,
                    links: body.links ?? existing[0].links,
                    lastUpdatedAt: new Date().toISOString(),
                })
                .where(eq(models.person.id, existing[0].id))
                .returning()

            return routeResponse({
                context: context,
                statusCode: 200,
                bodyValue: {
                    id: updated[0].id,
                    isFlagged: updated[0].isFlagged,
                },
            })
        }

        // Insert new
        const created = await Clients.platformPostgresql
            .insert(models.person)
            .values({
                id: generateId(),
                fullName: body.fullName,
                birthDate: body.birthDate ?? null,
                photoUrl: body.photoUrl ?? null,
                links: body.links ?? null,
                isFlagged: false,
                lastUpdatedAt: null,
                createdAt: new Date().toISOString(),
            })
            .returning()

        return routeResponse({
            context: context,
            statusCode: 200,
            bodyValue: {
                id: created[0].id,
                isFlagged: created[0].isFlagged,
            },
        })
    },
})
