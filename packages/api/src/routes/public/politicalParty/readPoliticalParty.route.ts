import { models } from "@openregistre/metadata/orm"
import { readPoliticalPartyRouteDefinition } from "@openregistre/metadata/routes"
import { eq } from "drizzle-orm"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { routeHandler } from "../../../utilities/api/routeHandler.js"
import { Clients } from "../../../utilities/clients.js"
import { Exception } from "../../../utilities/exception.js"
import { routeResponse } from "../../../utilities/route/routeResponse.js"


export const readPoliticalPartyRoute = routeHandler({
    definition: readPoliticalPartyRouteDefinition,
    handler: async ({ context }) => {
        const body = await validateBodyMiddleware({
            context: context,
            schema: readPoliticalPartyRouteDefinition.schemas.input,
        })

        const politicalParty = await Clients.platformPostgresql.query.politicalParty.findFirst({
            where: eq(models.politicalParty.id, body.id),
            with: {
                personPoliticalParties: {
                    with: {
                        person: true,
                    },
                },
            },
        })

        if (politicalParty === undefined) {
            throw new Exception({
                internalMessage: "Political party not found",
                externalMessage: "Political party not found",
                statusCode: 404,
            })
        }

        return routeResponse({
            context: context,
            statusCode: 200,
            bodyValue: {
                id: politicalParty.id,
                name: politicalParty.name,
                abbreviation: politicalParty.abbreviation,
                logoUrl: politicalParty.logoUrl,
                color: politicalParty.color,
                persons: politicalParty.personPoliticalParties.map((ppp) => ({
                    id: ppp.person.id,
                    fullName: ppp.person.fullName,
                    photoUrl: ppp.person.photoUrl,
                    startingAt: ppp.startingAt,
                    endingAt: ppp.endingAt,
                })),
            },
        })
    },
})
