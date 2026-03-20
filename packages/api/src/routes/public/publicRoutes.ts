import type { routeHandler } from "../../utilities/api/routeHandler.js"
import { lastAddedRoute } from "./lastAdded/lastAdded.route.js"
import { readPersonRoute } from "./person/readPerson.route.js"
import { readPoliticalPartyRoute } from "./politicalParty/readPoliticalParty.route.js"
import { readRoleRoute } from "./role/readRole.route.js"
import { searchFactsRoute } from "./search/searchFacts.route.js"
import { searchPersonsRoute } from "./search/searchPersons.route.js"
import { searchSourcesRoute } from "./search/searchSources.route.js"
import { statusRoute } from "./status.route.js"


export const publicRoutes: Array<ReturnType<typeof routeHandler>> = [
    statusRoute,
    readPersonRoute,
    readRoleRoute,
    readPoliticalPartyRoute,
    searchPersonsRoute,
    searchFactsRoute,
    searchSourcesRoute,
    lastAddedRoute,
]
