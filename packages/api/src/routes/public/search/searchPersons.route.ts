import { models } from "@openregistre/metadata/orm"
import { searchPersonsRouteDefinition } from "@openregistre/metadata/routes"
import { count, desc, gt, sql } from "drizzle-orm"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { routeHandler } from "../../../utilities/api/routeHandler.js"
import { Clients } from "../../../utilities/clients.js"
import { routeResponse } from "../../../utilities/route/routeResponse.js"


const PAGE_SIZE = 20

export const searchPersonsRoute = routeHandler({
    definition: searchPersonsRouteDefinition,
    handler: async ({ context }) => {
        const body = await validateBodyMiddleware({
            context: context,
            schema: searchPersonsRouteDefinition.schemas.input,
        })

        const similarity = sql<number>`similarity(${models.person.fullName}, ${body.query})`
        const threshold = 0.1

        const [results, totalCountResult] = await Promise.all([
            Clients.platformPostgresql
                .select({
                    id: models.person.id,
                    fullName: models.person.fullName,
                    photoUrl: models.person.photoUrl,
                    similarity: similarity,
                })
                .from(models.person)
                .where(gt(similarity, threshold))
                .orderBy(desc(similarity))
                .limit(PAGE_SIZE)
                .offset((body.page - 1) * PAGE_SIZE),

            Clients.platformPostgresql
                .select({ count: count() })
                .from(models.person)
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
