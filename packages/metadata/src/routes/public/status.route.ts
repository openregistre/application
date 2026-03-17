import * as v from "valibot"
import { booleanSchema } from "../../components/schemas/booleanSchema"
import { routeDefinition } from "../../utilities/index"


export const statusRouteDefinition = routeDefinition({
    methods: ["GET"],
    path: `/`,
    schemas: {
        input: v.object({}),
        output: v.object({
            status: v.nonNullable(booleanSchema)
        })
    }
})