import { createRoute } from "@tanstack/react-router"
import { PoliticalPartyPage } from "../../../features/politicalParty/politicalPartyPage"
import { bibliothequeLayoutRoute } from "../bibliotheque/bibliothequeLayoutRoute"


export const politicalPartyRoute = createRoute({
    getParentRoute: () => bibliothequeLayoutRoute,
    path: "/parti/$id",
    beforeLoad: () => ({
        title: "Parti politique",
    }),
    component: () => <PoliticalPartyPage />,
})
