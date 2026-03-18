import { relations } from "drizzle-orm"
import { personPoliticalPartyModel } from "../models/personPoliticalParty.model.js"
import { politicalPartyModel } from "../models/politicalParty.model.js"


export const politicalPartyRelations = relations(politicalPartyModel, ({ one, many }) => ({
    personPoliticalParties: many(personPoliticalPartyModel),
}))
