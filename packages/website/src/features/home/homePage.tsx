import { IconSearch } from "@tabler/icons-react"
import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { css } from "../../../styled-system/css/css"
import { Button } from "../../components/button/button"
import { ButtonPlainContent } from "../../components/button/buttonPlainContent"
import { Logo } from "../../components/layouts/logo"


export function HomePage() {
    const navigate = useNavigate()
    const [query, setQuery] = useState("")

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        if (query.trim() === "") return

        navigate({
            to: "/recherche",
            search: { q: query.trim(), page: 1 },
        })
    }

    return (
        <div
            className={css({
                width: "100%",
                minHeight: "100dvh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "background",
                paddingX: "1rem",
                gap: "3rem",
            })}
        >
            {/* Header */}
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem",
                })}
            >
                <Logo className={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }} />
                <h1
                    className={css({
                        color: "primary",
                        fontSize: "2.5rem",
                        fontWeight: "400",
                        lineHeight: "none",
                        letterSpacing: "-0.02em",
                    })}
                >
                    OpenRegistre
                </h1>
                <p
                    className={css({
                        maxWidth: "50ch",
                        textAlign: "center",
                        fontSize: "1rem",
                        lineHeight: "1.5",
                        color: "neutral/50",
                    })}
                >
                    Moteur de recherche sur les personnalités publiques françaises, leurs faits marquants et les sources associées.
                </p>
            </div>

            {/* Search */}
            <form
                onSubmit={handleSubmit}
                className={css({
                    width: "100%",
                    maxWidth: "40rem",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    alignItems: "stretch",
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
                        className={css({ width: "100%" })}
                    />
                </Button>
            </form>
        </div>
    )
}
