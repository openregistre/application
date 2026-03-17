import { relations } from "drizzle-orm"
import { personPoliticalPartyModel } from "../models/personPoliticalParty.model"
import { politicalPartyModel } from "../models/politicalParty.model"


export const politicalPartyRelations = relations(politicalPartyModel, ({ one, many }) => ({
    personPoliticalParties: many(personPoliticalPartyModel),
}))
