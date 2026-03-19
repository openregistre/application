import { IconInfoCircle, IconSearch } from "@tabler/icons-react"
import { Outlet } from "@tanstack/react-router"
import { css } from "../../styled-system/css/css"
import { Button } from "../components/button/button.tsx"
import { ButtonGhostContent } from "../components/button/buttonGhostContent.tsx"
import { ButtonOutlineContent } from "../components/button/buttonOutlineContent.tsx"
import { LinkButton } from "../components/button/linkButton.tsx"
import { LogoIcon } from "../components/layouts/logoIcon.tsx"
import { LogoText } from "../components/layouts/logoText.tsx"
import { Popover } from "../components/layouts/popover.tsx"
import { Separator } from "../components/layouts/separator.tsx"


const popoverLinkStyle = {
    width: "100%",
    justifyContent: "start",
}

export function RootLayout() {
    return (
        <div
            className={css({
                position: "relative",
                height: "100dvh",
                width: "100%",
                maxWidth: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                backgroundColor: "background",
            })}
        >
            {/* Top navigation bar */}
            <nav
                className={css({
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    borderBottomWidth: "1px",
                    borderBottomStyle: "solid",
                    borderBottomColor: "neutral/10",
                    padding: "1rem",
                })}
            >
                <div
                    className={css({
                        width: "100%",
                        maxWidth: "64rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    })}
                >
                    {/* Left — Logo */}
                    <LinkButton to="/">
                        <div
                            className={css({
                                display: "flex",
                                justifyContent: "start",
                                alignItems: "center",
                                gap: "0.25rem",
                                padding: "0.25rem",
                            })}
                        >
                            <LogoIcon />
                            <LogoText />
                        </div>
                    </LinkButton>

                    {/* Right — Popover triggers */}
                    <div
                        className={css({
                            display: "flex",
                            alignItems: "center",
                            gap: "0.25rem",
                        })}
                    >
                        {/* Collection popover */}
                        <Popover
                            position="bottom"
                            align="end"
                            triggerElement={
                                <Button>
                                    <ButtonOutlineContent
                                        leftIcon={<IconSearch />}
                                    />
                                </Button>
                            }
                        >
                            {({ setIsOpen }) => (
                                <div
                                    className={css({
                                        display: "flex",
                                        flexDirection: "column",
                                        padding: "0.25rem",
                                        gap: "0.125rem",
                                        minWidth: "12rem",
                                    })}
                                >
                                    <LinkButton
                                        to="/collection/recherche"
                                        className={popoverLinkStyle}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <ButtonGhostContent
                                            text="Recherche"
                                            className={popoverLinkStyle}
                                        />
                                    </LinkButton>
                                    <LinkButton
                                        to="/collection/derniers-ajouts"
                                        className={popoverLinkStyle}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <ButtonGhostContent
                                            text="Derniers ajouts"
                                            className={popoverLinkStyle}
                                        />
                                    </LinkButton>
                                </div>
                            )}
                        </Popover>

                        <Separator direction="vertical" className={{ height: "1.5rem" }} />

                        {/* Legal / info popover */}
                        <Popover
                            position="bottom"
                            align="end"
                            triggerElement={
                                <Button>
                                    <ButtonOutlineContent
                                        leftIcon={<IconInfoCircle />}
                                    />
                                </Button>
                            }
                        >
                            {({ setIsOpen }) => (
                                <div
                                    className={css({
                                        display: "flex",
                                        flexDirection: "column",
                                        padding: "0.25rem",
                                        gap: "0.125rem",
                                        minWidth: "12rem",
                                    })}
                                >
                                    <LinkButton
                                        to="/philosophie"
                                        className={popoverLinkStyle}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <ButtonGhostContent
                                            text="Philosophie"
                                            className={popoverLinkStyle}
                                        />
                                    </LinkButton>
                                    <LinkButton
                                        to="/mentions-légales"
                                        className={popoverLinkStyle}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <ButtonGhostContent
                                            text="Mentions légales"
                                            className={popoverLinkStyle}
                                        />
                                    </LinkButton>
                                    <LinkButton
                                        to="/confidentialité"
                                        className={popoverLinkStyle}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <ButtonGhostContent
                                            text="Confidentialité"
                                            className={popoverLinkStyle}
                                        />
                                    </LinkButton>
                                </div>
                            )}
                        </Popover>
                    </div>
                </div>
            </nav>

            {/* Page content — offset for fixed nav height */}
            <div
                className={css({
                    width: "100%",
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    overflowX: "hidden",
                    overflowY: "auto",
                    padding: "1rem",
                })}
            >
                <Outlet />
            </div>
        </div>
    )
}
