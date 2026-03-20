import { createRoute } from "@tanstack/react-router"
import { PrivacyPage } from "../../features/legal/privacyPage.tsx"
import { rootLayoutRoute } from "../rootLayoutRoute.tsx"


export const privacyRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/confidentialité",
    beforeLoad: () => ({
        title: "Confidentialité",
    }),
    component: () => <PrivacyPage />,
})
