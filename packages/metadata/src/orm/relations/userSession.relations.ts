import { relations } from "drizzle-orm"
import { userModel } from "../models/user.model"
import { userSessionModel } from "../models/userSession.model"


export const userSessionRelations = relations(userSessionModel, ({ one, many }) => ({
    user: one(userModel, {
        fields: [userSessionModel.idUser],
        references: [userModel.id],
    }),
}))
