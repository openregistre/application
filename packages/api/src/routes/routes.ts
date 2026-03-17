import type { routeHandler } from "../utilities/api/routeHandler.js"
import { adminRoutes } from "./admin/adminRoutes.js"
import { authRoutes } from "./auth/authRoutes.js"
import { publicRoutes } from "./public/publicRoutes.js"


export const routes: Array<ReturnType<typeof routeHandler>> = [
    ...adminRoutes,
    ...authRoutes,
    ...publicRoutes,
]
