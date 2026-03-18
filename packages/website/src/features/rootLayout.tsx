import { Link, Outlet } from "@tanstack/react-router"
import { css } from "../../styled-system/css/css"

export function RootLayout() {
    return (
        <div
            className={css({
                position: "relative",
                minHeight: "100dvh",
                width: "100%",
                maxWidth: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                overflowX: "hidden",
                overflowY: "auto",
            })}
        >
            <div className={css({ flex: "1", width: "100%", display: "flex", flexDirection: "column" })}>
                <Outlet />
            </div>

            {/* Footer */}
            <footer
                className={css({
                    width: "100%",
                    borderTopWidth: "1px",
                    borderTopColor: "neutral/10",
                    backgroundColor: "white",
                })}
            >
                <div
                    className={css({
                        width: "100%",
                        maxWidth: "64rem",
                        marginX: "auto",
                        paddingX: "1.5rem",
                        paddingY: "1.5rem",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "1rem",
                    })}
                >
                    <span className={css({ color: "neutral/25", fontSize: "0.8125rem" })}>
                        OpenRegistre
                    </span>
                    <nav
                        className={css({
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "1.5rem",
                            flexWrap: "wrap",
                        })}
                    >
                        <Link
                            to="/bibliotheque/derniers-ajouts"
                            className={css({
                                color: "neutral/40",
                                fontSize: "0.8125rem",
                                _hover: { color: "primary" },
                                transition: "color",
                                transitionDuration: "150ms",
                            })}
                        >
                            Derniers ajouts
                        </Link>
                        <Link
                            to="/philosophie"
                            className={css({
                                color: "neutral/40",
                                fontSize: "0.8125rem",
                                _hover: { color: "primary" },
                                transition: "color",
                                transitionDuration: "150ms",
                            })}
                        >
                            Philosophie
                        </Link>
                        <Link
                            to="/mentions-legales"
                            className={css({
                                color: "neutral/40",
                                fontSize: "0.8125rem",
                                _hover: { color: "primary" },
                                transition: "color",
                                transitionDuration: "150ms",
                            })}
                        >
                            Mentions légales
                        </Link>
                        <Link
                            to="/cgu"
                            className={css({
                                color: "neutral/40",
                                fontSize: "0.8125rem",
                                _hover: { color: "primary" },
                                transition: "color",
                                transitionDuration: "150ms",
                            })}
                        >
                            CGU
                        </Link>
                        <Link
                            to="/confidentialite"
                            className={css({
                                color: "neutral/40",
                                fontSize: "0.8125rem",
                                _hover: { color: "primary" },
                                transition: "color",
                                transitionDuration: "150ms",
                            })}
                        >
                            Confidentialité
                        </Link>
                    </nav>
                </div>
            </footer>
        </div>
    )
}
