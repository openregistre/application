import * as v from "valibot"
import { idSchema } from "../../../components/schemas/idSchema.js"
import { stringSchema } from "../../../components/schemas/stringSchema.js"
import { routeDefinition } from "../../../utilities/index.js"


export const readRoleRouteDefinition = routeDefinition({
    methods: ["POST"],
    path: `/public/read-role`,
    schemas: {
        input: v.object({
            id: v.nonNullable(idSchema),
        }),
        output: v.object({
            id: v.nonNullable(idSchema),
            label: v.nonNullable(stringSchema),
            persons: v.array(v.object({
                id: v.nonNullable(idSchema),
                fullName: v.nonNullable(stringSchema),
                photoUrl: v.nullable(stringSchema),
                startingAt: v.nullable(stringSchema),
                endingAt: v.nullable(stringSchema),
            })),
        })
    }
})
