import * as v from "valibot"
import { booleanSchema } from "../../../components/schemas/booleanSchema.js"
import { idSchema } from "../../../components/schemas/idSchema.js"
import { stringSchema } from "../../../components/schemas/stringSchema.js"
import { routeDefinition } from "../../../utilities/index.js"


export const upsertFactRouteDefinition = routeDefinition({
    methods: ["POST"],
    path: `/admin/upsert-fact`,
    schemas: {
        input: v.object({
            idPerson: v.nonNullable(idSchema),
            title: v.nonNullable(stringSchema),
            description: v.nonNullable(stringSchema),
            occurredAt: v.optional(v.nullable(stringSchema)),
        }),
        output: v.object({
            id: v.nonNullable(idSchema),
            isFlagged: v.nonNullable(booleanSchema),
        })
    }
})
