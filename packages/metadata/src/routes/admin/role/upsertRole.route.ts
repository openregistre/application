import * as v from "valibot"
import { idSchema } from "../../../components/schemas/idSchema.js"
import { stringSchema } from "../../../components/schemas/stringSchema.js"
import { routeDefinition } from "../../../utilities/index.js"


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
