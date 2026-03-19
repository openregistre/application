import { IconSearch } from "@tabler/icons-react"
import { Link, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { css } from "../../../styled-system/css/css"
import { Button } from "../../components/button/button"
import { ButtonPlainContent } from "../../components/button/buttonPlainContent"


export function HomePage() {
    const navigate = useNavigate()
    const [query, setQuery] = useState("")

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        if (query.trim() === "") return

        navigate({
            to: "/collection/recherche",
            search: { q: query.trim(), page: 1 },
        })
    }

    return (
        <div
            className={css({
                width: "100%",
                height: "100dvh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                overflow: "hidden",
            })}
        >
            {/* Main content — vertically centered */}
            <div
                className={css({
                    flex: "1",
                    width: "100%",
                    maxWidth: "40rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "start",
                    gap: "3rem",
                })}
            >
                {/* Header */}
                <div
                    className={css({
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        gap: "0.5rem",
                    })}
                >
                    <p
                        className={css({
                            maxWidth: "50ch",
                            textAlign: "left",
                            fontSize: "1rem",
                            lineHeight: "1.5",
                            color: "neutral/50",
                        })}
                    >
                        Moteur de recherche sur les personnalités publiques françaises, leurs faits marquants et les sources associées.
                    </p>
                </div>

                <div
                    className={css({
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "stretch",
                        gap: "2rem",
                    })}
                >
                    {/* Search */}
                    <form
                        onSubmit={handleSubmit}
                        className={css({
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "start",
                            alignItems: "start",
                            gap: "0.5rem",
                        })}
                    >
                        <div
                            className={css({
                                flex: "1",
                                display: "flex",
                                justifyContent: "start",
                                alignItems: "center",
                                borderWidth: "1px",
                                borderStyle: "solid",
                                borderColor: "neutral/20",
                                borderRadius: "0.5rem",
                                backgroundColor: "white",
                                paddingX: "0.75rem",
                                paddingY: "0.5rem",
                                gap: "0.5rem",
                                _focusWithin: {
                                    borderColor: "primary/50",
                                    outlineStyle: "solid",
                                    outlineWidth: "2px",
                                    outlineOffset: "-1px",
                                    outlineColor: "primary/10",
                                },
                            })}
                        >
                            <IconSearch
                                size={16}
                                className={css({
                                    flexShrink: "0",
                                    stroke: "neutral/25",
                                })}
                            />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.currentTarget.value)}
                                placeholder="Rechercher une personnalité, un fait, une source..."
                                className={css({
                                    width: "100%",
                                    fontSize: "0.875rem",
                                    lineHeight: "1rem",
                                    backgroundColor: "transparent",
                                    _placeholder: {
                                        color: "neutral/25",
                                    },
                                    _focus: {
                                        outline: "none",
                                    },
                                })}
                            />
                        </div>
                        <Button type="submit" className={css({ width: "100%" })}>
                            <ButtonPlainContent
                                text="Rechercher"
                                leftIcon={<IconSearch />}
                                className={{ width: "100%" }}
                            />
                        </Button>
                    </form>

                    {/* Terms acceptance */}
                    <div
                        className={css({
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "start",
                            alignItems: "center",
                            gap: "1rem",
                        })}
                    >
                        <p
                            className={css({
                                fontSize: "0.75rem",
                                color: "neutral/50",
                                textAlign: "left",
                                lineHeight: "1.5",
                            })}
                        >
                            En effectuant une recherche, vous acceptez les{" "}
                            <Link
                                to="/cgu"
                                className={css({
                                    color: "neutral/50",
                                    textDecoration: "underline",
                                    _hover: { color: "primary" },
                                    transition: "color",
                                    transitionDuration: "150ms",
                                })}
                            >
                                conditions générales d'utilisation
                            </Link>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
