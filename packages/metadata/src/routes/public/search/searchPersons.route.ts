import * as v from "valibot"
import { idSchema } from "../../../components/schemas/idSchema.js"
import { integerSchema } from "../../../components/schemas/integerSchema.js"
import { stringSchema } from "../../../components/schemas/stringSchema.js"
import { routeDefinition } from "../../../utilities/index.js"


export const searchPersonsRouteDefinition = routeDefinition({
    methods: ["POST"],
    path: `/public/search-persons`,
    schemas: {
        input: v.object({
            query: v.nonNullable(stringSchema),
            page: v.nonNullable(integerSchema),
        }),
        output: v.object({
            results: v.array(v.object({
                id: v.nonNullable(idSchema),
                fullName: v.nonNullable(stringSchema),
                photoUrl: v.nullable(stringSchema),
                similarity: v.nonNullable(v.number()),
            })),
            totalCount: v.nonNullable(integerSchema),
        })
    }
})
