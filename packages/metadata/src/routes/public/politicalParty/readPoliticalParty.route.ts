import * as v from "valibot"
import { idSchema } from "../../../components/schemas/idSchema.js"
import { stringSchema } from "../../../components/schemas/stringSchema.js"
import { routeDefinition } from "../../../utilities/index.js"


export const readPoliticalPartyRouteDefinition = routeDefinition({
    methods: ["POST"],
    path: `/public/read-political-party`,
    schemas: {
        input: v.object({
            id: v.nonNullable(idSchema),
        }),
        output: v.object({
            id: v.nonNullable(idSchema),
            name: v.nonNullable(stringSchema),
            abbreviation: v.nullable(stringSchema),
            logoUrl: v.nullable(stringSchema),
            color: v.nullable(stringSchema),
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
