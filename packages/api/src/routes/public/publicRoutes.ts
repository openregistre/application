import type { routeHandler } from "../../utilities/api/routeHandler.js"
import { readPersonRoute } from "./person/readPerson.route.js"
import { searchFactsRoute } from "./search/searchFacts.route.js"
import { searchPersonsRoute } from "./search/searchPersons.route.js"
import { searchSourcesRoute } from "./search/searchSources.route.js"
import { statusRoute } from "./status.route.js"


export const publicRoutes: Array<ReturnType<typeof routeHandler>> = [
    statusRoute,
    readPersonRoute,
    searchPersonsRoute,
    searchFactsRoute,
    searchSourcesRoute,
]
