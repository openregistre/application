import { createRoute } from "@tanstack/react-router"
import { LegalPage } from "../../features/legal/legalPage.tsx"
import { rootLayoutRoute } from "../rootLayoutRoute.tsx"


export const legalRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/mentions-légales",
    beforeLoad: () => ({
        title: "Mentions légales",
    }),
    component: () => <LegalPage />,
})
