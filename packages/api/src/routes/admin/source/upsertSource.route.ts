import { models } from "@openregistre/metadata/orm"
import { upsertSourceRouteDefinition } from "@openregistre/metadata/routes"
import { generateId } from "@openregistre/metadata/utilities"
import { eq } from "drizzle-orm"
import { checkApiKeyMiddleware } from "../../../middlewares/checkApiKey.middleware.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { routeHandler } from "../../../utilities/api/routeHandler.js"
import { Clients } from "../../../utilities/clients.js"
import { routeResponse } from "../../../utilities/route/routeResponse.js"


export const upsertSourceRoute = routeHandler({
    definition: upsertSourceRouteDefinition,
    handler: async ({ context }) => {
        await checkApiKeyMiddleware({ context })
        const body = await validateBodyMiddleware({
            context: context,
            schema: upsertSourceRouteDefinition.schemas.input,
        })

        // Source has unique url — find existing
        const existing = await Clients.platformPostgresql
            .select()
            .from(models.source)
            .where(eq(models.source.url, body.url))

        if (existing.length === 1) {
            const updated = await Clients.platformPostgresql
                .update(models.source)
                .set({
                    idFact: body.idFact,
                    idPublisher: body.idPublisher,
                    title: body.title,
                    publishedAt: body.publishedAt ?? existing[0].publishedAt,
                    lastUpdatedAt: new Date().toISOString(),
                })
                .where(eq(models.source.id, existing[0].id))
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
            .insert(models.source)
            .values({
                id: generateId(),
                idFact: body.idFact,
                idPublisher: body.idPublisher,
                url: body.url,
                title: body.title,
                publishedAt: body.publishedAt ?? null,
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
