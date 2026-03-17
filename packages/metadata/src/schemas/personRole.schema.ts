import * as v from 'valibot'
import { idSchema } from '../components/schemas/idSchema'
import { stringSchema } from '../components/schemas/stringSchema'
import { timestampSchema } from '../components/schemas/timestampSchema'
import type { personRoleModel } from '../orm/models/personRole.model'


export const personRoleSchema = v.object({
    "id":
        v.nonNullable(
            idSchema
        ),

    "idPerson":
        v.nonNullable(
            idSchema
        ),

    "idRole":
        v.nonNullable(
            idSchema
        ),

    "startingAt":
        v.nullable(
            stringSchema
        ),

    "endingAt":
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
    v.GenericSchema<typeof personRoleModel.$inferSelect>
