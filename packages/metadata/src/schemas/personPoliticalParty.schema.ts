import * as v from 'valibot'
import { idSchema } from '../components/schemas/idSchema.js'
import { stringSchema } from '../components/schemas/stringSchema.js'
import { timestampSchema } from '../components/schemas/timestampSchema.js'
import type { personPoliticalPartyModel } from '../orm/models/personPoliticalParty.model.js'


export const personPoliticalPartySchema = v.object({
    "id":
        v.nonNullable(
            idSchema
        ),

    "idPerson":
        v.nonNullable(
            idSchema
        ),

    "idPoliticalParty":
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
    v.GenericSchema<typeof personPoliticalPartyModel.$inferSelect>
