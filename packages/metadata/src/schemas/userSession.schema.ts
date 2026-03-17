import * as v from 'valibot'
import { booleanSchema } from '../components/schemas/booleanSchema'
import { idSchema } from '../components/schemas/idSchema'
import { stringSchema } from '../components/schemas/stringSchema'
import { timestampSchema } from '../components/schemas/timestampSchema'
import { userSessionModel } from '../orm/models/userSession.model'


export const userSessionSchema = v.object({
    "id":
        v.nonNullable(
            idSchema
        ),

    "idUser":
        v.nonNullable(
            idSchema
        ),

    "isActive":
        v.nonNullable(
            booleanSchema
        ),

    "token":
        v.nonNullable(
            stringSchema
        ),

    "ip":
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
    v.GenericSchema<typeof userSessionModel.$inferSelect>
