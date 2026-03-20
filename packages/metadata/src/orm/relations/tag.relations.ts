import { relations } from "drizzle-orm"
import { factTagModel } from "../models/factTag.model.js"
import { tagModel } from "../models/tag.model.js"


export const tagRelations = relations(tagModel, ({ one, many }) => ({
    factTags: many(factTagModel),
}))
