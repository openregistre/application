import { createRoute } from "@tanstack/react-router"
import { TermsPage } from "../../features/legal/termsPage"
import { rootLayoutRoute } from "../rootLayoutRoute"


export const termsRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/cgu",
    beforeLoad: () => ({
        title: "CGU",
    }),
    component: () => <TermsPage />,
})
