import { relations } from "drizzle-orm"
import { personModel } from "../models/person.model.js"
import { personPoliticalPartyModel } from "../models/personPoliticalParty.model.js"
import { politicalPartyModel } from "../models/politicalParty.model.js"


export const personPoliticalPartyRelations = relations(personPoliticalPartyModel, ({ one, many }) => ({
    person: one(personModel, {
        fields: [personPoliticalPartyModel.idPerson],
        references: [personModel.id],
    }),
    politicalParty: one(politicalPartyModel, {
        fields: [personPoliticalPartyModel.idPoliticalParty],
        references: [politicalPartyModel.id],
    }),
}))
