import { relations } from "drizzle-orm"
import { personModel } from "../models/person.model.js"
import { personRoleModel } from "../models/personRole.model.js"
import { roleModel } from "../models/role.model.js"


export const personRoleRelations = relations(personRoleModel, ({ one, many }) => ({
    person: one(personModel, {
        fields: [personRoleModel.idPerson],
        references: [personModel.id],
    }),
    role: one(roleModel, {
        fields: [personRoleModel.idRole],
        references: [roleModel.id],
    }),
}))
