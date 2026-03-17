import { relations } from "drizzle-orm"
import { userModel } from "../models/user.model"
import { userSessionModel } from "../models/userSession.model"


export const userRelations = relations(userModel, ({ one, many }) => ({
    userSessions: many(userSessionModel),
}))
