import * as v from 'valibot'
import { idSchema } from '../components/schemas/idSchema'
import { stringSchema } from '../components/schemas/stringSchema'
import { timestampSchema } from '../components/schemas/timestampSchema'
import type { politicalPartyModel } from '../orm/models/politicalParty.model'


export const politicalPartySchema = v.object({
    "id":
        v.nonNullable(
            idSchema
        ),

    "name":
        v.nonNullable(
            stringSchema
        ),

    "abbreviation":
        v.nullable(
            stringSchema
        ),

    "logoUrl":
        v.nullable(
            stringSchema
        ),

    "color":
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
    v.GenericSchema<typeof politicalPartyModel.$inferSelect>
