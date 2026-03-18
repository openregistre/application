import { relations } from "drizzle-orm"
import { factModel } from "../models/fact.model.js"
import { publisherModel } from "../models/publisher.model.js"
import { sourceModel } from "../models/source.model.js"


export const sourceRelations = relations(sourceModel, ({ one, many }) => ({
    fact: one(factModel, {
        fields: [sourceModel.idFact],
        references: [factModel.id],
    }),
    publisher: one(publisherModel, {
        fields: [sourceModel.idPublisher],
        references: [publisherModel.id],
    }),
}))
