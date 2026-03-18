import { createRoute } from "@tanstack/react-router"
import { PersonPage } from "../../../features/person/personPage"
import { bibliothequeLayoutRoute } from "../bibliotheque/bibliothequeLayoutRoute"


export const personRoute = createRoute({
    getParentRoute: () => bibliothequeLayoutRoute,
    path: "/personne/$id",
    beforeLoad: () => ({
        title: "Personne",
    }),
    component: () => <PersonPage />,
})
