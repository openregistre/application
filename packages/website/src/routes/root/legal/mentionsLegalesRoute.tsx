import { createRoute } from "@tanstack/react-router"
import { MentionsLegalesPage } from "../../../features/legal/mentionsLegalesPage"
import { rootLayoutRoute } from "../../rootLayoutRoute"


export const mentionsLegalesRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/mentions-legales",
    beforeLoad: () => ({
        title: "Mentions legales",
    }),
    component: () => <MentionsLegalesPage />,
})
