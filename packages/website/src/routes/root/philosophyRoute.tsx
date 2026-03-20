import { createRoute } from "@tanstack/react-router"
import { PhilosophyPage } from "../../features/legal/philosopyPage.tsx"
import { rootLayoutRoute } from "../rootLayoutRoute.tsx"


export const philosophyRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/philosophie",
    beforeLoad: () => ({
        title: "Philosophie",
    }),
    component: () => <PhilosophyPage />,
})
