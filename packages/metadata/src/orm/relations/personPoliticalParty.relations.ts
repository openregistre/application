import { relations } from "drizzle-orm"
import { personModel } from "../models/person.model"
import { personPoliticalPartyModel } from "../models/personPoliticalParty.model"
import { politicalPartyModel } from "../models/politicalParty.model"


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
