import * as v from 'valibot'
import { idSchema } from '../components/schemas/idSchema'
import { stringSchema } from '../components/schemas/stringSchema'
import { timestampSchema } from '../components/schemas/timestampSchema'
import type { publisherModel } from '../orm/models/publisher.model'


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
