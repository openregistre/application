import { models } from "@openregistre/metadata/orm"
import { upsertTagRouteDefinition } from "@openregistre/metadata/routes"
import { generateId } from "@openregistre/metadata/utilities"
import { eq } from "drizzle-orm"
import { checkApiKeyMiddleware } from "../../../middlewares/checkApiKey.middleware.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { routeHandler } from "../../../utilities/api/routeHandler.js"
import { Clients } from "../../../utilities/clients.js"
import { routeResponse } from "../../../utilities/route/routeResponse.js"


export const upsertTagRoute = routeHandler({
    definition: upsertTagRouteDefinition,
    handler: async ({ context }) => {
        await checkApiKeyMiddleware({ context })
        const body = await validateBodyMiddleware({
            context: context,
            schema: upsertTagRouteDefinition.schemas.input,
        })

        // Tag has unique label — find existing
        const existing = await Clients.platformPostgresql
            .select()
            .from(models.tag)
            .where(eq(models.tag.label, body.label))

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
            .insert(models.tag)
            .values({
                id: generateId(),
                label: body.label,
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
