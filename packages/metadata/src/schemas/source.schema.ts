import * as v from 'valibot'
import { idSchema } from '../components/schemas/idSchema.js'
import { stringSchema } from '../components/schemas/stringSchema.js'
import { timestampSchema } from '../components/schemas/timestampSchema.js'
import type { sourceModel } from '../orm/models/source.model.js'


export const sourceSchema = v.object({
    "id":
        v.nonNullable(
            idSchema
        ),

    "idFact":
        v.nonNullable(
            idSchema
        ),

    "idPublisher":
        v.nonNullable(
            idSchema
        ),

    "url":
        v.nonNullable(
            stringSchema
        ),

    "title":
        v.nonNullable(
            stringSchema
        ),

    "publishedAt":
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
    v.GenericSchema<typeof sourceModel.$inferSelect>
