import { createRoute } from "@tanstack/react-router"
import { RolePage } from "../../../../features/collection/role/rolePage"
import { collectionLayoutRoute } from "../collectionLayoutRoute"


export const roleRoute = createRoute({
    getParentRoute: () => collectionLayoutRoute,
    path: "/fonction/$id",
    beforeLoad: () => ({
        title: "Fonction",
    }),
    component: () => <RolePage />,
})
