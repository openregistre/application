import { models } from "@openregistre/metadata/orm"
import { upsertPublisherRouteDefinition } from "@openregistre/metadata/routes"
import { generateId } from "@openregistre/metadata/utilities"
import { eq } from "drizzle-orm"
import { checkApiKeyMiddleware } from "../../../middlewares/checkApiKey.middleware.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { routeHandler } from "../../../utilities/api/routeHandler.js"
import { Clients } from "../../../utilities/clients.js"
import { routeResponse } from "../../../utilities/route/routeResponse.js"


export const upsertPublisherRoute = routeHandler({
    definition: upsertPublisherRouteDefinition,
    handler: async ({ context }) => {
        await checkApiKeyMiddleware({ context })
        const body = await validateBodyMiddleware({
            context: context,
            schema: upsertPublisherRouteDefinition.schemas.input,
        })

        // Publisher has unique name — find existing
        const existing = await Clients.platformPostgresql
            .select()
            .from(models.publisher)
            .where(eq(models.publisher.name, body.name))

        if (existing.length === 1) {
            const updated = await Clients.platformPostgresql
                .update(models.publisher)
                .set({
                    websiteUrl: body.websiteUrl ?? existing[0].websiteUrl,
                    logoUrl: body.logoUrl ?? existing[0].logoUrl,
                    lastUpdatedAt: new Date().toISOString(),
                })
                .where(eq(models.publisher.id, existing[0].id))
                .returning()

            return routeResponse({
                context: context,
                statusCode: 200,
                bodyValue: {
                    id: updated[0].id,
                },
            })
        }

        // Insert new
        const created = await Clients.platformPostgresql
            .insert(models.publisher)
            .values({
                id: generateId(),
                name: body.name,
                websiteUrl: body.websiteUrl ?? null,
                logoUrl: body.logoUrl ?? null,
                lastUpdatedAt: null,
                createdAt: new Date().toISOString(),
            })
            .returning()

        return routeResponse({
            context: context,
            statusCode: 200,
            bodyValue: {
                id: created[0].id,
            },
        })
    },
})
