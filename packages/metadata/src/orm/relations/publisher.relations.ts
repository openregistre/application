import { relations } from "drizzle-orm"
import { publisherModel } from "../models/publisher.model.js"
import { sourceModel } from "../models/source.model.js"


export const publisherRelations = relations(publisherModel, ({ one, many }) => ({
    sources: many(sourceModel),
}))
