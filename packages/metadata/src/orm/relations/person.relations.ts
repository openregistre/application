import { relations } from "drizzle-orm"
import { factModel } from "../models/fact.model.js"
import { personModel } from "../models/person.model.js"
import { personPoliticalPartyModel } from "../models/personPoliticalParty.model.js"
import { personRoleModel } from "../models/personRole.model.js"


export const personRelations = relations(personModel, ({ one, many }) => ({
    facts: many(factModel),
    personRoles: many(personRoleModel),
    personPoliticalParties: many(personPoliticalPartyModel),
}))
