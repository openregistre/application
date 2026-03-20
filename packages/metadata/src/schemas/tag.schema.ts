import * as v from 'valibot'
import { idSchema } from '../components/schemas/idSchema.js'
import { stringSchema } from '../components/schemas/stringSchema.js'
import { timestampSchema } from '../components/schemas/timestampSchema.js'
import type { tagModel } from '../orm/models/tag.model.js'


export const tagSchema = v.object({
    "id":
        v.nonNullable(
            idSchema
        ),

    "label":
        v.nonNullable(
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
    v.GenericSchema<typeof tagModel.$inferSelect>
