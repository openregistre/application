import * as v from "valibot"
import { varcharSchema } from "../../../components/schemas/varcharSchema"
import { userSchema } from "../../../schemas/index"
import { routeDefinition } from "../../../utilities/index"


export const signInRouteDefinition = routeDefinition({
    methods: ["POST"],
    path: `/auth/sign-in`,
    schemas: {
        input: v.object({
            email: v.message(
                v.nonNullable(userSchema.entries.email),
                "Email is required."
            ),
            password: v.message(
                v.nonNullable(varcharSchema({ maxLength: 256 })),
                "Password is required."
            ),
        }),
        output: v.object({})
    }
})