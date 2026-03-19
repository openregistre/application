import * as v from 'valibot'
import { idSchema } from '../components/schemas/idSchema.js'
import { timestampSchema } from '../components/schemas/timestampSchema.js'
import type { factTagModel } from '../orm/models/factTag.model.js'


export const factTagSchema = v.object({
    "id":
        v.nonNullable(
            idSchema
        ),

    "idFact":
        v.nonNullable(
            idSchema
        ),

    "idTag":
        v.nonNullable(
            idSchema
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
    v.GenericSchema<typeof factTagModel.$inferSelect>
