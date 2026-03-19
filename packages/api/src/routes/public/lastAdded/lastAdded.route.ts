import { models } from "@openregistre/metadata/orm"
import { lastAddedRouteDefinition } from "@openregistre/metadata/routes"
import { desc, eq, inArray } from "drizzle-orm"
import { routeHandler } from "../../../utilities/api/routeHandler.js"
import { Clients } from "../../../utilities/clients.js"
import { routeResponse } from "../../../utilities/route/routeResponse.js"


const LIMIT = 10

export const lastAddedRoute = routeHandler({
    definition: lastAddedRouteDefinition,
    handler: async ({ context }) => {
        const [persons, facts, sources] = await Promise.all([
            Clients.platformPostgresql
                .select({
                    id: models.person.id,
                    fullName: models.person.fullName,
                    photoUrl: models.person.photoUrl,
                    createdAt: models.person.createdAt,
                })
                .from(models.person)
                .orderBy(desc(models.person.createdAt))
                .limit(LIMIT),

            Clients.platformPostgresql
                .select({
                    id: models.fact.id,
                    title: models.fact.title,
                    description: models.fact.description,
                    occurredAt: models.fact.occurredAt,
                    person: {
                        id: models.person.id,
                        fullName: models.person.fullName,
                    },
                    createdAt: models.fact.createdAt,
                })
                .from(models.fact)
                .innerJoin(models.person, eq(models.fact.idPerson, models.person.id))
                .orderBy(desc(models.fact.createdAt))
                .limit(LIMIT),

            Clients.platformPostgresql
                .select({
                    id: models.source.id,
                    url: models.source.url,
                    title: models.source.title,
                    publishedAt: models.source.publishedAt,
                    publisher: {
                        id: models.publisher.id,
                        name: models.publisher.name,
                        logoUrl: models.publisher.logoUrl,
                    },
                    fact: {
                        id: models.fact.id,
                        title: models.fact.title,
                    },
                    createdAt: models.source.createdAt,
                })
                .from(models.source)
                .innerJoin(models.publisher, eq(models.source.idPublisher, models.publisher.id))
                .innerJoin(models.fact, eq(models.source.idFact, models.fact.id))
                .orderBy(desc(models.source.createdAt))
                .limit(LIMIT),
        ])

        // Fetch tags for the returned facts
        const factIds = facts.map((f) => f.id)
        const factTags = factIds.length > 0
            ? await Clients.platformPostgresql
                .select({
                    idFact: models.factTag.idFact,
                    id: models.tag.id,
                    label: models.tag.label,
                })
                .from(models.factTag)
                .innerJoin(models.tag, eq(models.factTag.idTag, models.tag.id))
                .where(inArray(models.factTag.idFact, factIds))
            : []

        const tagsByFactId = new Map<string, Array<{ id: string; label: string }>>()
        for (const ft of factTags) {
            const existing = tagsByFactId.get(ft.idFact) ?? []
            existing.push({ id: ft.id, label: ft.label })
            tagsByFactId.set(ft.idFact, existing)
        }

        return routeResponse({
            context: context,
            statusCode: 200,
            bodyValue: {
                persons,
                facts: facts.map((f) => ({
                    ...f,
                    tags: tagsByFactId.get(f.id) ?? [],
                })),
                sources,
            },
        })
    },
})
