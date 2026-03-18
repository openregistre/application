import { createRoute } from "@tanstack/react-router"
import { RolePage } from "../../../features/role/rolePage"
import { bibliothequeLayoutRoute } from "../bibliotheque/bibliothequeLayoutRoute"


export const roleRoute = createRoute({
    getParentRoute: () => bibliothequeLayoutRoute,
    path: "/role/$id",
    beforeLoad: () => ({
        title: "Role",
    }),
    component: () => <RolePage />,
})
