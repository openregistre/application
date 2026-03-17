import { createRoute } from "@tanstack/react-router"
import { SearchPage } from "../../../features/search/searchPage"
import { rootLayoutRoute } from "../../rootLayoutRoute"


export const searchRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/recherche",
    validateSearch: (search: Record<string, unknown>) => ({
        q: (search.q as string) || "",
        page: Number(search.page) || 1,
    }),
    beforeLoad: () => ({
        title: "Recherche",
    }),
    component: () => <SearchPage />,
})
