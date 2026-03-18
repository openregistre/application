import type { AnyRoute } from "@tanstack/react-router"
import { catchRoute } from "./catchRoute.js"
import { bibliothequeLayoutRoute } from "./root/bibliotheque/bibliothequeLayoutRoute.js"
import { homeLayoutRoute } from "./root/home/homeLayoutRoute.js"
import { homeRootRoute } from "./root/home/homeRootRoute.js"
import { lastAddedRoute } from "./root/lastAdded/lastAddedRoute.js"
import { cguRoute } from "./root/legal/cguRoute.js"
import { confidentialiteRoute } from "./root/legal/confidentialiteRoute.js"
import { mentionsLegalesRoute } from "./root/legal/mentionsLegalesRoute.js"
import { philosophieRoute } from "./root/legal/philosophieRoute.js"
import { personRoute } from "./root/person/personRoute.js"
import { politicalPartyRoute } from "./root/politicalParty/politicalPartyRoute.js"
import { roleRoute } from "./root/role/roleRoute.js"
import { searchRoute } from "./root/search/searchRoute.js"
import { rootLayoutRoute } from "./rootLayoutRoute.js"

export const applicationTree: AnyRoute = rootLayoutRoute.addChildren([
    homeLayoutRoute.addChildren([homeRootRoute]),

    bibliothequeLayoutRoute.addChildren([
        searchRoute,
        personRoute,
        roleRoute,
        politicalPartyRoute,
        lastAddedRoute,
    ]),

    philosophieRoute,
    mentionsLegalesRoute,
    cguRoute,
    confidentialiteRoute,

    catchRoute,
])
