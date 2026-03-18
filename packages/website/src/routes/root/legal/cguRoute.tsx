import { createRoute } from "@tanstack/react-router"
import { CguPage } from "../../../features/legal/cguPage"
import { rootLayoutRoute } from "../../rootLayoutRoute"


export const cguRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/cgu",
    beforeLoad: () => ({
        title: "CGU",
    }),
    component: () => <CguPage />,
})
