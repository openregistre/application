import * as v from "valibot"
import { idSchema } from "../../../components/schemas/idSchema.js"
import { stringSchema } from "../../../components/schemas/stringSchema.js"
import { routeDefinition } from "../../../utilities/index.js"


export const upsertPersonPoliticalPartyRouteDefinition = routeDefinition({
    methods: ["POST"],
    path: `/admin/upsert-person-political-party`,
    schemas: {
        input: v.object({
            idPerson: v.nonNullable(idSchema),
            idPoliticalParty: v.nonNullable(idSchema),
            startingAt: v.optional(v.nullable(stringSchema)),
            endingAt: v.optional(v.nullable(stringSchema)),
        }),
        output: v.object({
            id: v.nonNullable(idSchema),
        })
    }
})
