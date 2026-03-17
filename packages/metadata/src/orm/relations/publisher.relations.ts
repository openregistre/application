import { relations } from "drizzle-orm"
import { publisherModel } from "../models/publisher.model"
import { sourceModel } from "../models/source.model"


export const publisherRelations = relations(publisherModel, ({ one, many }) => ({
    sources: many(sourceModel),
}))
