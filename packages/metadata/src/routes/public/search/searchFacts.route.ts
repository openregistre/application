import * as v from "valibot"
import { idSchema } from "../../../components/schemas/idSchema"
import { integerSchema } from "../../../components/schemas/integerSchema"
import { stringSchema } from "../../../components/schemas/stringSchema"
import { routeDefinition } from "../../../utilities/index"


export const searchFactsRouteDefinition = routeDefinition({
    methods: ["POST"],
    path: `/public/search-facts`,
    schemas: {
        input: v.object({
            query: v.nonNullable(stringSchema),
            page: v.nonNullable(integerSchema),
        }),
        output: v.object({
            results: v.array(v.object({
                id: v.nonNullable(idSchema),
                title: v.nonNullable(stringSchema),
                description: v.nonNullable(stringSchema),
                occurredAt: v.nullable(stringSchema),
                category: v.nullable(stringSchema),
                person: v.object({
                    id: v.nonNullable(idSchema),
                    fullName: v.nonNullable(stringSchema),
                }),
                similarity: v.nonNullable(v.number()),
            })),
            totalCount: v.nonNullable(integerSchema),
        })
    }
})
