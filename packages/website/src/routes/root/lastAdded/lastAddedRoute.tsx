import { createRoute } from "@tanstack/react-router"
import { LastAddedPage } from "../../../features/lastAdded/lastAddedPage"
import { bibliothequeLayoutRoute } from "../bibliotheque/bibliothequeLayoutRoute"


export const lastAddedRoute = createRoute({
    getParentRoute: () => bibliothequeLayoutRoute,
    path: "/derniers-ajouts",
    beforeLoad: () => ({
        title: "Derniers ajouts",
    }),
    component: () => <LastAddedPage />,
})
