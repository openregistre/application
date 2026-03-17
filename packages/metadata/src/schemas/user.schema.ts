import * as v from 'valibot'
import { booleanSchema } from '../components/schemas/booleanSchema'
import { emailSchema } from '../components/schemas/emailSchema'
import { idSchema } from '../components/schemas/idSchema'
import { stringSchema } from '../components/schemas/stringSchema'
import { timestampSchema } from '../components/schemas/timestampSchema'
import type { userModel } from '../orm/models/user.model'


export const userSchema = v.object({
    "id":
        v.nonNullable(
            idSchema
        ),

    "isArchived":
        v.nonNullable(
            booleanSchema
        ),

    "isActive":
        v.nonNullable(
            booleanSchema
        ),

    "email":
        v.nonNullable(
            emailSchema
        ),

    "passwordHash": v.nonNullable(
        stringSchema
    ),

    "passwordSalt": v.nonNullable(
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
    v.GenericSchema<typeof userModel.$inferSelect>
