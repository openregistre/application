import * as v from "valibot"
import { idSchema } from "../../../components/schemas/idSchema.js"
import { integerSchema } from "../../../components/schemas/integerSchema.js"
import { stringSchema } from "../../../components/schemas/stringSchema.js"
import { routeDefinition } from "../../../utilities/index.js"


export const searchSourcesRouteDefinition = routeDefinition({
    methods: ["POST"],
    path: `/public/search-sources`,
    schemas: {
        input: v.object({
            query: v.nonNullable(stringSchema),
            page: v.nonNullable(integerSchema),
        }),
        output: v.object({
            results: v.array(v.object({
                id: v.nonNullable(idSchema),
                url: v.nonNullable(stringSchema),
                title: v.nonNullable(stringSchema),
                publishedAt: v.nullable(stringSchema),
                publisher: v.object({
                    id: v.nonNullable(idSchema),
                    name: v.nonNullable(stringSchema),
                    logoUrl: v.nullable(stringSchema),
                }),
                fact: v.object({
                    id: v.nonNullable(idSchema),
                    title: v.nonNullable(stringSchema),
                }),
                similarity: v.nonNullable(v.number()),
            })),
            totalCount: v.nonNullable(integerSchema),
        })
    }
})
