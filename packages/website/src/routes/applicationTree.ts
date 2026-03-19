import type { AnyRoute } from "@tanstack/react-router"
import { catchRoute } from "./catchRoute.js"
import { collectionLayoutRoute } from "./root/collection/collectionLayoutRoute.js"
import { lastAddedRoute } from "./root/collection/lastAddedRoute.js"
import { personRoute } from "./root/collection/person/personRoute.js"
import { politicalPartyRoute } from "./root/collection/politicalParty/politicalPartyRoute.js"
import { roleRoute } from "./root/collection/role/roleRoute.js"
import { searchRoute } from "./root/collection/searchRoute.js"
import { homeLayoutRoute } from "./root/home/homeLayoutRoute.js"
import { homeRootRoute } from "./root/home/homeRootRoute.js"
import { legalRoute } from "./root/legalRoute.js"
import { philosophyRoute } from "./root/philosophyRoute.js"
import { privacyRoute } from "./root/privacyRoute.js"
import { termsRoute } from "./root/termsRoute.js"
import { rootLayoutRoute } from "./rootLayoutRoute.js"

export const applicationTree: AnyRoute = rootLayoutRoute.addChildren([
    homeLayoutRoute.addChildren([homeRootRoute]),

    collectionLayoutRoute.addChildren([
        searchRoute,
        personRoute,
        roleRoute,
        politicalPartyRoute,
        lastAddedRoute,
    ]),

    philosophyRoute,
    legalRoute,
    termsRoute,
    privacyRoute,

    catchRoute,
])
