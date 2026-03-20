import { models } from "@openregistre/metadata/orm"
import { readRoleRouteDefinition } from "@openregistre/metadata/routes"
import { eq } from "drizzle-orm"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { routeHandler } from "../../../utilities/api/routeHandler.js"
import { Clients } from "../../../utilities/clients.js"
import { Exception } from "../../../utilities/exception.js"
import { routeResponse } from "../../../utilities/route/routeResponse.js"


export const readRoleRoute = routeHandler({
    definition: readRoleRouteDefinition,
    handler: async ({ context }) => {
        const body = await validateBodyMiddleware({
            context: context,
            schema: readRoleRouteDefinition.schemas.input,
        })

        const role = await Clients.platformPostgresql.query.role.findFirst({
            where: eq(models.role.id, body.id),
            with: {
                personRoles: {
                    with: {
                        person: true,
                    },
                },
            },
        })

        if (role === undefined) {
            throw new Exception({
                internalMessage: "Role not found",
                externalMessage: "Role not found",
                statusCode: 404,
            })
        }

        return routeResponse({
            context: context,
            statusCode: 200,
            bodyValue: {
                id: role.id,
                label: role.label,
                persons: role.personRoles.map((pr) => ({
                    id: pr.person.id,
                    fullName: pr.person.fullName,
                    photoUrl: pr.person.photoUrl,
                    startingAt: pr.startingAt,
                    endingAt: pr.endingAt,
                })),
            },
        })
    },
})
