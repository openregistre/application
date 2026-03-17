import { models } from "@openregistre/metadata/orm"
import { searchSourcesRouteDefinition } from "@openregistre/metadata/routes"
import { count, desc, eq, gt, sql } from "drizzle-orm"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { routeHandler } from "../../../utilities/api/routeHandler.js"
import { Clients } from "../../../utilities/clients.js"
import { routeResponse } from "../../../utilities/route/routeResponse.js"


const PAGE_SIZE = 20

export const searchSourcesRoute = routeHandler({
    definition: searchSourcesRouteDefinition,
    handler: async ({ context }) => {
        const body = await validateBodyMiddleware({
            context: context,
            schema: searchSourcesRouteDefinition.schemas.input,
        })

        const similarity = sql<number>`similarity(${models.source.title}, ${body.query})`
        const threshold = 0.1

        const [results, totalCountResult] = await Promise.all([
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
                    similarity: similarity,
                })
                .from(models.source)
                .innerJoin(models.publisher, eq(models.source.idPublisher, models.publisher.id))
                .innerJoin(models.fact, eq(models.source.idFact, models.fact.id))
                .where(gt(similarity, threshold))
                .orderBy(desc(similarity))
                .limit(PAGE_SIZE)
                .offset((body.page - 1) * PAGE_SIZE),

            Clients.platformPostgresql
                .select({ count: count() })
                .from(models.source)
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
