import * as v from "valibot"
import { idSchema } from "../../../components/schemas/idSchema"
import { stringSchema } from "../../../components/schemas/stringSchema"
import { routeDefinition } from "../../../utilities/index"


export const upsertPersonRoleRouteDefinition = routeDefinition({
    methods: ["POST"],
    path: `/admin/upsert-person-role`,
    schemas: {
        input: v.object({
            idPerson: v.nonNullable(idSchema),
            idRole: v.nonNullable(idSchema),
            startingAt: v.optional(v.nullable(stringSchema)),
            endingAt: v.optional(v.nullable(stringSchema)),
        }),
        output: v.object({
            id: v.nonNullable(idSchema),
        })
    }
})
