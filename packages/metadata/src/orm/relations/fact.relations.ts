import { relations } from "drizzle-orm"
import { factModel } from "../models/fact.model.js"
import { factTagModel } from "../models/factTag.model.js"
import { personModel } from "../models/person.model.js"
import { sourceModel } from "../models/source.model.js"


export const factRelations = relations(factModel, ({ one, many }) => ({
    person: one(personModel, {
        fields: [factModel.idPerson],
        references: [personModel.id],
    }),
    sources: many(sourceModel),
    factTags: many(factTagModel),
}))
