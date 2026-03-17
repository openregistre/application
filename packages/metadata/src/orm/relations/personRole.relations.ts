import { relations } from "drizzle-orm"
import { personModel } from "../models/person.model"
import { personRoleModel } from "../models/personRole.model"
import { roleModel } from "../models/role.model"


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
