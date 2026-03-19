import { createRoute } from "@tanstack/react-router"
import { LastAddedPage } from "../../../features/lastAdded/lastAddedPage"
import { collectionLayoutRoute } from "./collectionLayoutRoute"


export const lastAddedRoute = createRoute({
    getParentRoute: () => collectionLayoutRoute,
    path: "/derniers-ajouts",
    beforeLoad: () => ({
        title: "Derniers ajouts",
    }),
    component: () => <LastAddedPage />,
})
