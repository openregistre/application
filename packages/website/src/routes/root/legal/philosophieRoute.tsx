import { createRoute } from "@tanstack/react-router"
import { PhilosophiePage } from "../../../features/legal/philosophiePage"
import { rootLayoutRoute } from "../../rootLayoutRoute"


export const philosophieRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/philosophie",
    beforeLoad: () => ({
        title: "Philosophie",
    }),
    component: () => <PhilosophiePage />,
})
