import { models } from "@openregistre/metadata/orm"
import { upsertPersonRoleRouteDefinition } from "@openregistre/metadata/routes"
import { generateId } from "@openregistre/metadata/utilities"
import { and, eq } from "drizzle-orm"
import { checkApiKeyMiddleware } from "../../../middlewares/checkApiKey.middleware.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { routeHandler } from "../../../utilities/api/routeHandler.js"
import { Clients } from "../../../utilities/clients.js"
import { routeResponse } from "../../../utilities/route/routeResponse.js"


export const upsertPersonRoleRoute = routeHandler({
    definition: upsertPersonRoleRouteDefinition,
    handler: async ({ context }) => {
        await checkApiKeyMiddleware({ context })
        const body = await validateBodyMiddleware({
            context: context,
            schema: upsertPersonRoleRouteDefinition.schemas.input,
        })

        // Find existing by person + role combination
        const existing = await Clients.platformPostgresql
            .select()
            .from(models.personRole)
            .where(and(
                eq(models.personRole.idPerson, body.idPerson),
                eq(models.personRole.idRole, body.idRole),
            ))

        if (existing.length === 1) {
            const updated = await Clients.platformPostgresql
                .update(models.personRole)
                .set({
                    startingAt: body.startingAt ?? existing[0].startingAt,
                    endingAt: body.endingAt ?? existing[0].endingAt,
                    lastUpdatedAt: new Date().toISOString(),
                })
                .where(eq(models.personRole.id, existing[0].id))
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
            .insert(models.personRole)
            .values({
                id: generateId(),
                idPerson: body.idPerson,
                idRole: body.idRole,
                startingAt: body.startingAt ?? null,
                endingAt: body.endingAt ?? null,
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
