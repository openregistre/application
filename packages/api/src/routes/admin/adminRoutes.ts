import type { routeHandler } from "../../utilities/api/routeHandler.js"
import { upsertFactRoute } from "./fact/upsertFact.route.js"
import { upsertPersonRoute } from "./person/upsertPerson.route.js"
import { upsertPersonPoliticalPartyRoute } from "./personPoliticalParty/upsertPersonPoliticalParty.route.js"
import { upsertPersonRoleRoute } from "./personRole/upsertPersonRole.route.js"
import { upsertPoliticalPartyRoute } from "./politicalParty/upsertPoliticalParty.route.js"
import { upsertPublisherRoute } from "./publisher/upsertPublisher.route.js"
import { upsertRoleRoute } from "./role/upsertRole.route.js"
import { upsertSourceRoute } from "./source/upsertSource.route.js"


export const adminRoutes: Array<ReturnType<typeof routeHandler>> = [
    upsertPersonRoute,
    upsertRoleRoute,
    upsertPersonRoleRoute,
    upsertPoliticalPartyRoute,
    upsertPersonPoliticalPartyRoute,
    upsertFactRoute,
    upsertPublisherRoute,
    upsertSourceRoute,
]
