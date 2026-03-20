import * as v from "valibot"
import { idSchema } from "../../../components/schemas/idSchema.js"
import { stringSchema } from "../../../components/schemas/stringSchema.js"
import { stringArraySchema } from "../../../components/schemas/stringArraySchema.js"
import { booleanSchema } from "../../../components/schemas/booleanSchema.js"
import { routeDefinition } from "../../../utilities/index.js"


export const readPersonRouteDefinition = routeDefinition({
    methods: ["POST"],
    path: `/public/read-person`,
    schemas: {
        input: v.object({
            id: v.nonNullable(idSchema),
        }),
        output: v.object({
            id: v.nonNullable(idSchema),
            fullName: v.nonNullable(stringSchema),
            birthDate: v.nullable(stringSchema),
            photoUrl: v.nullable(stringSchema),
            links: v.nullable(stringArraySchema),
            roles: v.array(v.object({
                id: v.nonNullable(idSchema),
                label: v.nonNullable(stringSchema),
                startingAt: v.nullable(stringSchema),
                endingAt: v.nullable(stringSchema),
            })),
            politicalParties: v.array(v.object({
                id: v.nonNullable(idSchema),
                name: v.nonNullable(stringSchema),
                abbreviation: v.nullable(stringSchema),
                logoUrl: v.nullable(stringSchema),
                color: v.nullable(stringSchema),
                startingAt: v.nullable(stringSchema),
                endingAt: v.nullable(stringSchema),
            })),
            facts: v.array(v.object({
                id: v.nonNullable(idSchema),
                title: v.nonNullable(stringSchema),
                description: v.nonNullable(stringSchema),
                occurredAt: v.nullable(stringSchema),
                tags: v.array(v.object({
                    id: v.nonNullable(idSchema),
                    label: v.nonNullable(stringSchema),
                })),
                sources: v.array(v.object({
                    id: v.nonNullable(idSchema),
                    url: v.nonNullable(stringSchema),
                    title: v.nonNullable(stringSchema),
                    publishedAt: v.nullable(stringSchema),
                    publisher: v.object({
                        id: v.nonNullable(idSchema),
                        name: v.nonNullable(stringSchema),
                        logoUrl: v.nullable(stringSchema),
                    }),
                })),
            })),
        })
    }
})
