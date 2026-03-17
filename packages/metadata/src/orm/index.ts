import { factModel } from "./models/fact.model"
import { personModel } from "./models/person.model"
import { personPoliticalPartyModel } from "./models/personPoliticalParty.model"
import { personRoleModel } from "./models/personRole.model"
import { politicalPartyModel } from "./models/politicalParty.model"
import { publisherModel } from "./models/publisher.model"
import { roleModel } from "./models/role.model"
import { sourceModel } from "./models/source.model"
import { userModel } from "./models/user.model"
import { userSessionModel } from "./models/userSession.model"
import { factRelations } from "./relations/fact.relations"
import { personRelations } from "./relations/person.relations"
import { personPoliticalPartyRelations } from "./relations/personPoliticalParty.relations"
import { personRoleRelations } from "./relations/personRole.relations"
import { politicalPartyRelations } from "./relations/politicalParty.relations"
import { publisherRelations } from "./relations/publisher.relations"
import { roleRelations } from "./relations/role.relations"
import { sourceRelations } from "./relations/source.relations"
import { userRelations } from "./relations/user.relations"
import { userSessionRelations } from "./relations/userSession.relations"


// Individual exports (used by drizzle-kit schema loader)
export {
    factModel,
    personModel,
    personPoliticalPartyModel,
    personRoleModel,
    politicalPartyModel,
    publisherModel,
    roleModel,
    sourceModel,
    userModel,
    userSessionModel,
    factRelations,
    personRelations,
    personPoliticalPartyRelations,
    personRoleRelations,
    politicalPartyRelations,
    publisherRelations,
    roleRelations,
    sourceRelations,
    userRelations,
    userSessionRelations,
}

// Grouped exports (used by application code)
export const models = {
    fact: factModel,
    person: personModel,
    personPoliticalParty: personPoliticalPartyModel,
    personRole: personRoleModel,
    politicalParty: politicalPartyModel,
    publisher: publisherModel,
    role: roleModel,
    source: sourceModel,
    user: userModel,
    userSession: userSessionModel,
}

export const relations = {
    fact: factRelations,
    person: personRelations,
    personPoliticalParty: personPoliticalPartyRelations,
    personRole: personRoleRelations,
    politicalParty: politicalPartyRelations,
    publisher: publisherRelations,
    role: roleRelations,
    source: sourceRelations,
    user: userRelations,
    userSession: userSessionRelations,
}

export const modelSchemas = {
    // Models
    fact: factModel,
    person: personModel,
    personPoliticalParty: personPoliticalPartyModel,
    personRole: personRoleModel,
    politicalParty: politicalPartyModel,
    publisher: publisherModel,
    role: roleModel,
    source: sourceModel,
    user: userModel,
    userSession: userSessionModel,
    // Relations
    factRelations,
    personRelations,
    personPoliticalPartyRelations,
    personRoleRelations,
    politicalPartyRelations,
    publisherRelations,
    roleRelations,
    sourceRelations,
    userRelations,
    userSessionRelations,
}
