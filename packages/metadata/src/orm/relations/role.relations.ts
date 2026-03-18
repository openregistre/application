import { relations } from "drizzle-orm"
import { personRoleModel } from "../models/personRole.model.js"
import { roleModel } from "../models/role.model.js"


export const roleRelations = relations(roleModel, ({ one, many }) => ({
    personRoles: many(personRoleModel),
}))
