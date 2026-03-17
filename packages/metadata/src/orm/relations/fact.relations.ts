import { relations } from "drizzle-orm"
import { factModel } from "../models/fact.model"
import { personModel } from "../models/person.model"
import { sourceModel } from "../models/source.model"


export const factRelations = relations(factModel, ({ one, many }) => ({
    person: one(personModel, {
        fields: [factModel.idPerson],
        references: [personModel.id],
    }),
    sources: many(sourceModel),
}))
