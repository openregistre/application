import type { routeHandler } from "../../utilities/api/routeHandler.js"
import { upsertFactRoute } from "./fact/upsertFact.route.js"
import { upsertFactTagRoute } from "./factTag/upsertFactTag.route.js"
import { upsertPersonRoute } from "./person/upsertPerson.route.js"
import { upsertPersonPoliticalPartyRoute } from "./personPoliticalParty/upsertPersonPoliticalParty.route.js"
import { upsertPersonRoleRoute } from "./personRole/upsertPersonRole.route.js"
import { upsertPoliticalPartyRoute } from "./politicalParty/upsertPoliticalParty.route.js"
import { upsertPublisherRoute } from "./publisher/upsertPublisher.route.js"
import { upsertRoleRoute } from "./role/upsertRole.route.js"
import { upsertSourceRoute } from "./source/upsertSource.route.js"
import { upsertTagRoute } from "./tag/upsertTag.route.js"


export const adminRoutes: Array<ReturnType<typeof routeHandler>> = [
    upsertPersonRoute,
    upsertRoleRoute,
    upsertPersonRoleRoute,
    upsertPoliticalPartyRoute,
    upsertPersonPoliticalPartyRoute,
    upsertFactRoute,
    upsertTagRoute,
    upsertFactTagRoute,
    upsertPublisherRoute,
    upsertSourceRoute,
]
