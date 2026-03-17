import { models } from "@openregistre/metadata/orm"
import { searchFactsRouteDefinition } from "@openregistre/metadata/routes"
import { count, desc, eq, gt, sql } from "drizzle-orm"
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
                    category: models.fact.category,
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

        return routeResponse({
            context: context,
            statusCode: 200,
            bodyValue: {
                results: results,
                totalCount: totalCountResult[0]?.count ?? 0,
            },
        })
    },
})
