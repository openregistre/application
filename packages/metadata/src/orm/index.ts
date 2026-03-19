import { factModel } from "./models/fact.model.js"
import { factTagModel } from "./models/factTag.model.js"
import { personModel } from "./models/person.model.js"
import { personPoliticalPartyModel } from "./models/personPoliticalParty.model.js"
import { personRoleModel } from "./models/personRole.model.js"
import { politicalPartyModel } from "./models/politicalParty.model.js"
import { publisherModel } from "./models/publisher.model.js"
import { roleModel } from "./models/role.model.js"
import { sourceModel } from "./models/source.model.js"
import { tagModel } from "./models/tag.model.js"
import { userModel } from "./models/user.model.js"
import { userSessionModel } from "./models/userSession.model.js"
import { factRelations } from "./relations/fact.relations.js"
import { factTagRelations } from "./relations/factTag.relations.js"
import { personRelations } from "./relations/person.relations.js"
import { personPoliticalPartyRelations } from "./relations/personPoliticalParty.relations.js"
import { personRoleRelations } from "./relations/personRole.relations.js"
import { politicalPartyRelations } from "./relations/politicalParty.relations.js"
import { publisherRelations } from "./relations/publisher.relations.js"
import { roleRelations } from "./relations/role.relations.js"
import { sourceRelations } from "./relations/source.relations.js"
import { tagRelations } from "./relations/tag.relations.js"
import { userRelations } from "./relations/user.relations.js"
import { userSessionRelations } from "./relations/userSession.relations.js"


// Individual exports (used by drizzle-kit schema loader)
export {
    factModel,
    factTagModel,
    personModel,
    personPoliticalPartyModel,
    personRoleModel,
    politicalPartyModel,
    publisherModel,
    roleModel,
    sourceModel,
    tagModel,
    userModel,
    userSessionModel,
    factRelations,
    factTagRelations,
    personRelations,
    personPoliticalPartyRelations,
    personRoleRelations,
    politicalPartyRelations,
    publisherRelations,
    roleRelations,
    sourceRelations,
    tagRelations,
    userRelations,
    userSessionRelations,
}

// Grouped exports (used by application code)
export const models = {
    fact: factModel,
    factTag: factTagModel,
    person: personModel,
    personPoliticalParty: personPoliticalPartyModel,
    personRole: personRoleModel,
    politicalParty: politicalPartyModel,
    publisher: publisherModel,
    role: roleModel,
    source: sourceModel,
    tag: tagModel,
    user: userModel,
    userSession: userSessionModel,
}

export const relations = {
    fact: factRelations,
    factTag: factTagRelations,
    person: personRelations,
    personPoliticalParty: personPoliticalPartyRelations,
    personRole: personRoleRelations,
    politicalParty: politicalPartyRelations,
    publisher: publisherRelations,
    role: roleRelations,
    source: sourceRelations,
    tag: tagRelations,
    user: userRelations,
    userSession: userSessionRelations,
}

export const modelSchemas = {
    // Models
    fact: factModel,
    factTag: factTagModel,
    person: personModel,
    personPoliticalParty: personPoliticalPartyModel,
    personRole: personRoleModel,
    politicalParty: politicalPartyModel,
    publisher: publisherModel,
    role: roleModel,
    source: sourceModel,
    tag: tagModel,
    user: userModel,
    userSession: userSessionModel,
    // Relations
    factRelations,
    factTagRelations,
    personRelations,
    personPoliticalPartyRelations,
    personRoleRelations,
    politicalPartyRelations,
    publisherRelations,
    roleRelations,
    sourceRelations,
    tagRelations,
    userRelations,
    userSessionRelations,
}
