import { createRoute } from "@tanstack/react-router"
import { PoliticalPartyPage } from "../../../../features/collection/politicalParty/politicalPartyPage"
import { collectionLayoutRoute } from "../collectionLayoutRoute"


export const politicalPartyRoute = createRoute({
    getParentRoute: () => collectionLayoutRoute,
    path: "/parti/$id",
    beforeLoad: () => ({
        title: "Parti politique",
    }),
    component: () => <PoliticalPartyPage />,
})
