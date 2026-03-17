import * as v from "valibot"
import { idSchema } from "../../../components/schemas/idSchema"
import { stringSchema } from "../../../components/schemas/stringSchema"
import { routeDefinition } from "../../../utilities/index"


export const upsertPublisherRouteDefinition = routeDefinition({
    methods: ["POST"],
    path: `/admin/upsert-publisher`,
    schemas: {
        input: v.object({
            name: v.nonNullable(stringSchema),
            websiteUrl: v.optional(v.nullable(stringSchema)),
            logoUrl: v.optional(v.nullable(stringSchema)),
        }),
        output: v.object({
            id: v.nonNullable(idSchema),
        })
    }
})
