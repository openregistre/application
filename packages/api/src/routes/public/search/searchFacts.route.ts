import { models } from "@openregistre/metadata/orm"
import { searchFactsRouteDefinition } from "@openregistre/metadata/routes"
import { count, desc, eq, gt, inArray, sql } from "drizzle-orm"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { routeHandler } from "../../../utilities/api/routeHandler.js"
import { Clients } from "../../../utilities/clients.js"
import { routeResponse } from "../../../utilities/route/routeResponse.js"


const PAGE_SIZE = 20

export const searchFactsRoute = routeHandler({
    definition: searchFactsRouteDefinition,
    handler: async ({ context }) => {
        const body = await validateBodyMiddleware({
            context: context,
            schema: searchFactsRouteDefinition.schemas.input,
        })

        const similarity = sql<number>`GREATEST(similarity(${models.fact.title}, ${body.query}), similarity(${models.fact.description}, ${body.query}))`
        const threshold = 0.1

        const [results, totalCountResult] = await Promise.all([
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
                    similarity: similarity,
                })
                .from(models.fact)
                .innerJoin(models.person, eq(models.fact.idPerson, models.person.id))
                .where(gt(similarity, threshold))
                .orderBy(desc(similarity))
                .limit(PAGE_SIZE)
                .offset((body.page - 1) * PAGE_SIZE),

            Clients.platformPostgresql
                .select({ count: count() })
                .from(models.fact)
                .where(gt(similarity, threshold)),
        ])

        // Fetch tags for the returned facts
        const factIds = results.map((r) => r.id)
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
                results: results.map((r) => ({
                    ...r,
                    tags: tagsByFactId.get(r.id) ?? [],
                })),
                totalCount: totalCountResult[0]?.count ?? 0,
            },
        })
    },
})
