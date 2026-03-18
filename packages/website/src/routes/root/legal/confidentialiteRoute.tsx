import { createRoute } from "@tanstack/react-router"
import { ConfidentialitePage } from "../../../features/legal/confidentialitePage"
import { rootLayoutRoute } from "../../rootLayoutRoute"


export const confidentialiteRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/confidentialite",
    beforeLoad: () => ({
        title: "Confidentialite",
    }),
    component: () => <ConfidentialitePage />,
})
