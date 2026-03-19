import { createRoute } from "@tanstack/react-router"
import { SearchPage } from "../../../features/collection/search/searchPage.tsx"
import { collectionLayoutRoute } from "./collectionLayoutRoute"


export const searchRoute = createRoute({
    getParentRoute: () => collectionLayoutRoute,
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
