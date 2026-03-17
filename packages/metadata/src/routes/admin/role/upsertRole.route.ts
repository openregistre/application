import * as v from "valibot"
import { idSchema } from "../../../components/schemas/idSchema"
import { stringSchema } from "../../../components/schemas/stringSchema"
import { routeDefinition } from "../../../utilities/index"


export const upsertRoleRouteDefinition = routeDefinition({
    methods: ["POST"],
    path: `/admin/upsert-role`,
    schemas: {
        input: v.object({
            label: v.nonNullable(stringSchema),
        }),
        output: v.object({
            id: v.nonNullable(idSchema),
        })
    }
})
