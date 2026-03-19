import { createRoute } from "@tanstack/react-router"
import { PersonPage } from "../../../../features/collection/person/personPage"
import { collectionLayoutRoute } from "../collectionLayoutRoute"


export const personRoute = createRoute({
    getParentRoute: () => collectionLayoutRoute,
    path: "/personne/$id",
    beforeLoad: () => ({
        title: "Personne",
    }),
    component: () => <PersonPage />,
})
