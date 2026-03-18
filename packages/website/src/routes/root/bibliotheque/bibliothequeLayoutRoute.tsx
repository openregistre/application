import { createRoute, Link, Outlet } from "@tanstack/react-router"
import { css } from "../../../../styled-system/css/css"
import { Logo } from "../../../components/layouts/logo"
import { rootLayoutRoute } from "../../rootLayoutRoute"

export const bibliothequeLayoutRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/bibliotheque",
    component: BibliothequeLayout,
})


function BibliothequeLayout() {
    return (
        <div
            className={css({
                width: "100%",
                minHeight: "100dvh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                backgroundColor: "background",
            })}
        >
            {/* Shared top bar */}
            <div
                className={css({
                    width: "100%",
                    borderBottomWidth: "1px",
                    borderBottomColor: "neutral/10",
                    backgroundColor: "white",
                })}
            >
                <div
                    className={css({
                        width: "100%",
                        maxWidth: "64rem",
                        marginX: "auto",
                        paddingX: "1.5rem",
                        paddingY: "0.75rem",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "start",
                        alignItems: "center",
                        gap: "0.25rem",
                    })}
                >
                    <Link
                        to="/"
                        className={css({
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        })}
                    >
                        <Logo />
                    </Link>
                    <Link
                        to="/"
                        className={css({
                            color: "primary",
                            fontSize: "1rem",
                            fontWeight: "400",
                            letterSpacing: "-0.02em",
                        })}
                    >
                        OpenRegistre
                    </Link>
                </div>
            </div>

            <Outlet />
        </div>
    )
}
