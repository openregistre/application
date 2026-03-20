import { relations } from "drizzle-orm"
import { factModel } from "../models/fact.model.js"
import { factTagModel } from "../models/factTag.model.js"
import { tagModel } from "../models/tag.model.js"


export const factTagRelations = relations(factTagModel, ({ one, many }) => ({
    fact: one(factModel, {
        fields: [factTagModel.idFact],
        references: [factModel.id],
    }),
    tag: one(tagModel, {
        fields: [factTagModel.idTag],
        references: [tagModel.id],
    }),
}))
