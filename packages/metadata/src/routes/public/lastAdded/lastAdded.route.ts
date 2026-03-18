import * as v from "valibot"
import { idSchema } from "../../../components/schemas/idSchema.js"
import { integerSchema } from "../../../components/schemas/integerSchema.js"
import { stringSchema } from "../../../components/schemas/stringSchema.js"
import { routeDefinition } from "../../../utilities/index.js"


export const lastAddedRouteDefinition = routeDefinition({
    methods: ["POST"],
    path: `/public/last-added`,
    schemas: {
        input: v.object({}),
        output: v.object({
            persons: v.array(v.object({
                id: v.nonNullable(idSchema),
                fullName: v.nonNullable(stringSchema),
                photoUrl: v.nullable(stringSchema),
                createdAt: v.nonNullable(stringSchema),
            })),
            facts: v.array(v.object({
                id: v.nonNullable(idSchema),
                title: v.nonNullable(stringSchema),
                description: v.nonNullable(stringSchema),
                occurredAt: v.nullable(stringSchema),
                category: v.nullable(stringSchema),
                person: v.object({
                    id: v.nonNullable(idSchema),
                    fullName: v.nonNullable(stringSchema),
                }),
                createdAt: v.nonNullable(stringSchema),
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
                fact: v.object({
                    id: v.nonNullable(idSchema),
                    title: v.nonNullable(stringSchema),
                }),
                createdAt: v.nonNullable(stringSchema),
            })),
        })
    }
})
