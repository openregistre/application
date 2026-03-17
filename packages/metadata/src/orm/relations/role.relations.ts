import { relations } from "drizzle-orm"
import { personRoleModel } from "../models/personRole.model"
import { roleModel } from "../models/role.model"


export const roleRelations = relations(roleModel, ({ one, many }) => ({
    personRoles: many(personRoleModel),
}))
