import * as v from 'valibot'
import { idSchema } from '../components/schemas/idSchema.js'
import { stringSchema } from '../components/schemas/stringSchema.js'
import { timestampSchema } from '../components/schemas/timestampSchema.js'
import type { politicalPartyModel } from '../orm/models/politicalParty.model.js'


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
