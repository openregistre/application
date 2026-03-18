import * as v from 'valibot'
import { booleanSchema } from '../components/schemas/booleanSchema.js'
import { idSchema } from '../components/schemas/idSchema.js'
import { stringSchema } from '../components/schemas/stringSchema.js'
import { timestampSchema } from '../components/schemas/timestampSchema.js'
import type { factModel } from '../orm/models/fact.model.js'


export const factSchema = v.object({
    "id":
        v.nonNullable(
            idSchema
        ),

    "idPerson":
        v.nonNullable(
            idSchema
        ),

    "title":
        v.nonNullable(
            stringSchema
        ),

    "description":
        v.nonNullable(
            stringSchema
        ),

    "occurredAt":
        v.nullable(
            stringSchema
        ),

    "category":
        v.nullable(
            stringSchema
        ),

    "isFlagged":
        v.nonNullable(
            booleanSchema
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
    v.GenericSchema<typeof factModel.$inferSelect>
