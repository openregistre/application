import { createRoute } from "@tanstack/react-router"
import { CollectionLayout } from "../../../features/collection/collectionLayout.tsx"
import { rootLayoutRoute } from "../../rootLayoutRoute.tsx"


export const collectionLayoutRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/collection",
    component: () => <CollectionLayout />,
})



