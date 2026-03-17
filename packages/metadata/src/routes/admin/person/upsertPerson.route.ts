import * as v from "valibot"
import { booleanSchema } from "../../../components/schemas/booleanSchema"
import { idSchema } from "../../../components/schemas/idSchema"
import { stringArraySchema } from "../../../components/schemas/stringArraySchema"
import { stringSchema } from "../../../components/schemas/stringSchema"
import { routeDefinition } from "../../../utilities/index"


export const upsertPersonRouteDefinition = routeDefinition({
    methods: ["POST"],
    path: `/admin/upsert-person`,
    schemas: {
        input: v.object({
            fullName: v.nonNullable(stringSchema),
            birthDate: v.optional(v.nullable(stringSchema)),
            photoUrl: v.optional(v.nullable(stringSchema)),
            links: v.optional(v.nullable(stringArraySchema)),
        }),
        output: v.object({
            id: v.nonNullable(idSchema),
            isFlagged: v.nonNullable(booleanSchema),
        })
    }
})
