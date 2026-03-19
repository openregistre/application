import { models } from "@openregistre/metadata/orm"
import { upsertFactRouteDefinition } from "@openregistre/metadata/routes"
import { generateId } from "@openregistre/metadata/utilities"
import { and, eq } from "drizzle-orm"
import { checkApiKeyMiddleware } from "../../../middlewares/checkApiKey.middleware.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { routeHandler } from "../../../utilities/api/routeHandler.js"
import { Clients } from "../../../utilities/clients.js"
import { routeResponse } from "../../../utilities/route/routeResponse.js"


export const upsertFactRoute = routeHandler({
    definition: upsertFactRouteDefinition,
    handler: async ({ context }) => {
        await checkApiKeyMiddleware({ context })
        const body = await validateBodyMiddleware({
            context: context,
            schema: upsertFactRouteDefinition.schemas.input,
        })

        // Look for existing facts with the same title for the same person
        const existing = await Clients.platformPostgresql
            .select()
            .from(models.fact)
            .where(and(
                eq(models.fact.idPerson, body.idPerson),
                eq(models.fact.title, body.title),
            ))

        // Ambiguous: multiple matches
        if (existing.length > 1) {
            for (const fact of existing) {
                await Clients.platformPostgresql
                    .update(models.fact)
                    .set({ isFlagged: true, lastUpdatedAt: new Date().toISOString() })
                    .where(eq(models.fact.id, fact.id))
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
                .update(models.fact)
                .set({
                    description: body.description,
                    occurredAt: body.occurredAt ?? existing[0].occurredAt,
                    lastUpdatedAt: new Date().toISOString(),
                })
                .where(eq(models.fact.id, existing[0].id))
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
            .insert(models.fact)
            .values({
                id: generateId(),
                idPerson: body.idPerson,
                title: body.title,
                description: body.description,
                occurredAt: body.occurredAt ?? null,
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
