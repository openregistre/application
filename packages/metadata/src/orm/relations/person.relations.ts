import { relations } from "drizzle-orm"
import { factModel } from "../models/fact.model"
import { personModel } from "../models/person.model"
import { personPoliticalPartyModel } from "../models/personPoliticalParty.model"
import { personRoleModel } from "../models/personRole.model"


export const personRelations = relations(personModel, ({ one, many }) => ({
    facts: many(factModel),
    personRoles: many(personRoleModel),
    personPoliticalParties: many(personPoliticalPartyModel),
}))
