import * as v from "valibot"
import { userSchema } from "../../../schemas/index"
import { routeDefinition } from "../../../utilities/index"


export const readUserRouteDefinition = routeDefinition({
    methods: ["POST"],
    path: `/auth/read-user`,
    schemas: {
        input: v.object({}),
        output: v.object({
            id: userSchema.entries.id,
            isActive: userSchema.entries.isActive,
            email: userSchema.entries.email,
            createdAt: userSchema.entries.createdAt,
        })
    }
})