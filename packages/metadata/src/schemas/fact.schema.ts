import * as v from 'valibot'
import { booleanSchema } from '../components/schemas/booleanSchema'
import { idSchema } from '../components/schemas/idSchema'
import { stringSchema } from '../components/schemas/stringSchema'
import { timestampSchema } from '../components/schemas/timestampSchema'
import type { factModel } from '../orm/models/fact.model'


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
