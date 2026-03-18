import * as v from 'valibot'
import { booleanSchema } from '../components/schemas/booleanSchema.js'
import { idSchema } from '../components/schemas/idSchema.js'
import { stringArraySchema } from '../components/schemas/stringArraySchema.js'
import { stringSchema } from '../components/schemas/stringSchema.js'
import { timestampSchema } from '../components/schemas/timestampSchema.js'
import type { personModel } from '../orm/models/person.model.js'


export const personSchema = v.object({
    "id":
        v.nonNullable(
            idSchema
        ),

    "fullName":
        v.nonNullable(
            stringSchema
        ),

    "birthDate":
        v.nullable(
            stringSchema
        ),

    "photoUrl":
        v.nullable(
            stringSchema
        ),

    "links":
        v.nullable(
            stringArraySchema
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
    v.GenericSchema<typeof personModel.$inferSelect>
