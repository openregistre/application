import * as v from 'valibot'
import { idSchema } from '../components/schemas/idSchema.js'
import { stringSchema } from '../components/schemas/stringSchema.js'
import { timestampSchema } from '../components/schemas/timestampSchema.js'
import type { personRoleModel } from '../orm/models/personRole.model.js'


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
