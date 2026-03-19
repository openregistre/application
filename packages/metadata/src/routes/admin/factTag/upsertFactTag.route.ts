import * as v from "valibot"
import { idSchema } from "../../../components/schemas/idSchema.js"
import { routeDefinition } from "../../../utilities/index.js"


export const upsertFactTagRouteDefinition = routeDefinition({
    methods: ["POST"],
    path: `/admin/upsert-fact-tag`,
    schemas: {
        input: v.object({
            idFact: v.nonNullable(idSchema),
            idTag: v.nonNullable(idSchema),
        }),
        output: v.object({
            id: v.nonNullable(idSchema),
        })
    }
})
