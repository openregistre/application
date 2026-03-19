import { models } from "@openregistre/metadata/orm"
import { readPersonRouteDefinition } from "@openregistre/metadata/routes"
import { eq } from "drizzle-orm"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { routeHandler } from "../../../utilities/api/routeHandler.js"
import { Clients } from "../../../utilities/clients.js"
import { Exception } from "../../../utilities/exception.js"
import { routeResponse } from "../../../utilities/route/routeResponse.js"


export const readPersonRoute = routeHandler({
    definition: readPersonRouteDefinition,
    handler: async ({ context }) => {
        const body = await validateBodyMiddleware({
            context: context,
            schema: readPersonRouteDefinition.schemas.input,
        })

        const person = await Clients.platformPostgresql.query.person.findFirst({
            where: eq(models.person.id, body.id),
            with: {
                facts: {
                    with: {
                        sources: {
                            with: {
                                publisher: true,
                            },
                        },
                        factTags: {
                            with: {
                                tag: true,
                            },
                        },
                    },
                },
                personRoles: {
                    with: {
                        role: true,
                    },
                },
                personPoliticalParties: {
                    with: {
                        politicalParty: true,
                    },
                },
            },
        })

        if (person === undefined) {
            throw new Exception({
                internalMessage: "Person not found",
                externalMessage: "Person not found",
                statusCode: 404,
            })
        }

        return routeResponse({
            context: context,
            statusCode: 200,
            bodyValue: {
                id: person.id,
                fullName: person.fullName,
                birthDate: person.birthDate,
                photoUrl: person.photoUrl,
                links: person.links,
                roles: person.personRoles.map((pr) => ({
                    id: pr.role.id,
                    label: pr.role.label,
                    startingAt: pr.startingAt,
                    endingAt: pr.endingAt,
                })),
                politicalParties: person.personPoliticalParties.map((ppp) => ({
                    id: ppp.politicalParty.id,
                    name: ppp.politicalParty.name,
                    abbreviation: ppp.politicalParty.abbreviation,
                    logoUrl: ppp.politicalParty.logoUrl,
                    color: ppp.politicalParty.color,
                    startingAt: ppp.startingAt,
                    endingAt: ppp.endingAt,
                })),
                facts: person.facts.map((fact) => ({
                    id: fact.id,
                    title: fact.title,
                    description: fact.description,
                    occurredAt: fact.occurredAt,
                    tags: fact.factTags.map((ft) => ({
                        id: ft.tag.id,
                        label: ft.tag.label,
                    })),
                    sources: fact.sources.map((source) => ({
                        id: source.id,
                        url: source.url,
                        title: source.title,
                        publishedAt: source.publishedAt,
                        publisher: {
                            id: source.publisher.id,
                            name: source.publisher.name,
                            logoUrl: source.publisher.logoUrl,
                        },
                    })),
                })),
            },
        })
    },
})
