import * as v from 'valibot'
import { booleanSchema } from '../components/schemas/booleanSchema'
import { idSchema } from '../components/schemas/idSchema'
import { stringArraySchema } from '../components/schemas/stringArraySchema'
import { stringSchema } from '../components/schemas/stringSchema'
import { timestampSchema } from '../components/schemas/timestampSchema'
import type { personModel } from '../orm/models/person.model'


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
