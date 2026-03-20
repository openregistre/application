import * as v from 'valibot'
import { idSchema } from '../components/schemas/idSchema.js'
import { stringSchema } from '../components/schemas/stringSchema.js'
import { timestampSchema } from '../components/schemas/timestampSchema.js'
import type { publisherModel } from '../orm/models/publisher.model.js'


export const publisherSchema = v.object({
    "id":
        v.nonNullable(
            idSchema
        ),

    "name":
        v.nonNullable(
            stringSchema
        ),

    "websiteUrl":
        v.nullable(
            stringSchema
        ),

    "logoUrl":
        v.nullable(
            stringSchema
        ),

    "lastUpdatedAt":
        v.nullable(
            timestampSchema
        ),

    "createdAt":
        v.nonNullable(
            timestampSchema
        ),

}) satisfies
    v.GenericSchema<typeof publisherModel.$inferSelect>
