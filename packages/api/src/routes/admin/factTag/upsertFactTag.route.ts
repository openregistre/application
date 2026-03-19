import { models } from "@openregistre/metadata/orm"
import { upsertFactTagRouteDefinition } from "@openregistre/metadata/routes"
import { generateId } from "@openregistre/metadata/utilities"
import { and, eq } from "drizzle-orm"
import { checkApiKeyMiddleware } from "../../../middlewares/checkApiKey.middleware.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { routeHandler } from "../../../utilities/api/routeHandler.js"
import { Clients } from "../../../utilities/clients.js"
import { routeResponse } from "../../../utilities/route/routeResponse.js"


export const upsertFactTagRoute = routeHandler({
    definition: upsertFactTagRouteDefinition,
    handler: async ({ context }) => {
        await checkApiKeyMiddleware({ context })
        const body = await validateBodyMiddleware({
            context: context,
            schema: upsertFactTagRouteDefinition.schemas.input,
        })

        // Find existing by fact + tag combination
        const existing = await Clients.platformPostgresql
            .select()
            .from(models.factTag)
            .where(and(
                eq(models.factTag.idFact, body.idFact),
                eq(models.factTag.idTag, body.idTag),
            ))

        if (existing.length === 1) {
            return routeResponse({
                context: context,
                statusCode: 200,
                bodyValue: {
                    id: existing[0].id,
                },
            })
        }

        // Insert new
        const created = await Clients.platformPostgresql
            .insert(models.factTag)
            .values({
                id: generateId(),
                idFact: body.idFact,
                idTag: body.idTag,
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
