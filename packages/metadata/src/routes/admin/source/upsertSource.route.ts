import * as v from "valibot"
import { idSchema } from "../../../components/schemas/idSchema.js"
import { stringSchema } from "../../../components/schemas/stringSchema.js"
import { routeDefinition } from "../../../utilities/index.js"


export const upsertSourceRouteDefinition = routeDefinition({
    methods: ["POST"],
    path: `/admin/upsert-source`,
    schemas: {
        input: v.object({
            idFact: v.nonNullable(idSchema),
            idPublisher: v.nonNullable(idSchema),
            url: v.nonNullable(stringSchema),
            title: v.nonNullable(stringSchema),
            publishedAt: v.optional(v.nullable(stringSchema)),
        }),
        output: v.object({
            id: v.nonNullable(idSchema),
        })
    }
})
