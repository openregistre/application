import { createRoute } from "@tanstack/react-router"
import { PersonPage } from "../../../features/person/personPage"
import { rootLayoutRoute } from "../../rootLayoutRoute"


export const personRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/personne/$id",
    beforeLoad: () => ({
        title: "Personne",
    }),
    component: () => <PersonPage />,
})
