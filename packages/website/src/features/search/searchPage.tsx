import {
    searchFactsRouteDefinition,
    searchPersonsRouteDefinition,
    searchSourcesRouteDefinition,
} from "@openregistre/metadata/routes"
import { IconExternalLink, IconSearch } from "@tabler/icons-react"
import { Link, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { css } from "../../../styled-system/css/css"
import { cx } from "../../../styled-system/css/cx"
import { CircularLoader } from "../../components/circularLoader"
import { Chip } from "../../components/data/chip"
import { Logo } from "../../components/layouts/logo"
import { searchRoute } from "../../routes/root/search/searchRoute"
import { useDataFromAPI } from "../../utilities/useDataFromAPI"
import { Pagination } from "./pagination"


type SearchTab = "personnes" | "faits" | "sources"

const tabs: Array<{ key: SearchTab; label: string }> = [
    { key: "personnes", label: "Personnes" },
    { key: "faits", label: "Faits" },
    { key: "sources", label: "Sources" },
]

export function SearchPage() {
    const { q, page } = searchRoute.useSearch()
    const navigate = useNavigate()
    const [localQuery, setLocalQuery] = useState(q)
    const [activeTab, setActiveTab] = useState<SearchTab>("personnes")

    const hasQuery = q.length > 0

    const persons = useDataFromAPI({
        routeDefinition: searchPersonsRouteDefinition,
        body: { query: q, page: activeTab === "personnes" ? page : 1 },
        enabled: hasQuery,
    })

    const facts = useDataFromAPI({
        routeDefinition: searchFactsRouteDefinition,
        body: { query: q, page: activeTab === "faits" ? page : 1 },
        enabled: hasQuery,
    })

    const sources = useDataFromAPI({
        routeDefinition: searchSourcesRouteDefinition,
        body: { query: q, page: activeTab === "sources" ? page : 1 },
        enabled: hasQuery,
    })

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        if (localQuery.trim() === "") return

        navigate({
            to: "/recherche",
            search: { q: localQuery.trim(), page: 1 },
        })
    }

    function handleTabChange(tab: SearchTab) {
        setActiveTab(tab)
        navigate({
            to: "/recherche",
            search: { q, page: 1 },
        })
    }

    function handlePageChange(newPage: number) {
        navigate({
            to: "/recherche",
            search: { q, page: newPage },
        })
    }

    function getTabCount(tab: SearchTab): number | undefined {
        switch (tab) {
            case "personnes": return persons.data?.totalCount
            case "faits": return facts.data?.totalCount
            case "sources": return sources.data?.totalCount
        }
    }

    function isTabLoading(tab: SearchTab): boolean {
        switch (tab) {
            case "personnes": return persons.isLoading
            case "faits": return facts.isLoading
            case "sources": return sources.isLoading
        }
    }

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
            {/* Top bar */}
            <div
                className={css({
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "start",
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
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "start",
                        paddingX: "1.5rem",
                        paddingTop: "1rem",
                        gap: "1rem",
                    })}
                >
                    {/* Search row */}
                    <form
                        onSubmit={handleSubmit}
                        className={css({
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                            alignItems: "start",
                            gap: "0.5rem",
                        })}
                    >
                        <Link
                            to="/"
                            className={css({
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexShrink: "0",
                            })}
                        >
                            <Logo />
                            <h1
                                className={css({
                                    color: "primary",
                                    fontSize: "1rem",
                                    fontWeight: "400",
                                    lineHeight: "none",
                                    letterSpacing: "-0.02em",
                                })}
                            >
                                OpenRegistre
                            </h1>
                        </Link>

                        <div
                            className={css({
                                flex: "1",
                                width: "100%",
                                maxWidth: "36rem",
                                display: "flex",
                                justifyContent: "start",
                                alignItems: "center",
                                borderWidth: "1px",
                                borderColor: "neutral/20",
                                borderRadius: "0.5rem",
                                backgroundColor: "white",
                                paddingX: "0.75rem",
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
                                value={localQuery}
                                onChange={(e) => setLocalQuery(e.currentTarget.value)}
                                placeholder="Rechercher..."
                                className={css({
                                    width: "100%",
                                    height: "2.25rem",
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
                    </form>

                    {/* Tabs */}
                    <div
                        className={css({
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "center",
                            gap: "0",
                        })}
                    >
                        {tabs.map((tab) => {
                            const count = getTabCount(tab.key)
                            const loading = hasQuery && isTabLoading(tab.key)

                            return (
                                <button
                                    key={tab.key}
                                    type="button"
                                    onClick={() => handleTabChange(tab.key)}
                                    className={cx(
                                        css({
                                            paddingX: "1rem",
                                            paddingY: "0.625rem",
                                            fontSize: "0.875rem",
                                            lineHeight: "1rem",
                                            fontWeight: "400",
                                            color: "neutral/50",
                                            borderBottomWidth: "2px",
                                            borderBottomColor: "transparent",
                                            transition: "all",
                                            transitionDuration: "150ms",
                                            cursor: "pointer",
                                            backgroundColor: "transparent",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.375rem",
                                            _hover: {
                                                color: "neutral/75",
                                            },
                                        }),
                                        activeTab === tab.key
                                            ? css({
                                                color: "primary",
                                                borderBottomColor: "primary",
                                                fontWeight: "400",
                                            })
                                            : "",
                                    )}
                                >
                                    {tab.label}
                                    {hasQuery && (
                                        loading ? (
                                            <CircularLoader size={12} />
                                        ) : count !== undefined ? (
                                            <span
                                                className={css({
                                                    fontSize: "0.75rem",
                                                    lineHeight: "1rem",
                                                    color: activeTab === tab.key ? "primary/50" : "neutral/25",
                                                    fontWeight: "400",
                                                })}
                                            >
                                                {count}
                                            </span>
                                        ) : null
                                    )}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div
                className={css({
                    width: "100%",
                    maxWidth: "64rem",
                    marginX: "auto",
                    paddingX: "1.5rem",
                    paddingY: "1.5rem",
                    flex: "1",
                })}
            >
                {!hasQuery ? (
                    <p
                        className={css({
                            color: "neutral/50",
                            fontSize: "0.875rem",
                            fontStyle: "italic",
                        })}
                    >
                        Saisissez un terme pour lancer la recherche.
                    </p>
                ) : activeTab === "personnes" ? (
                    <PersonsResults
                        data={persons.data}
                        isLoading={persons.isLoading}
                        page={page}
                        onPageChange={handlePageChange}
                    />
                ) : activeTab === "faits" ? (
                    <FactsResults
                        data={facts.data}
                        isLoading={facts.isLoading}
                        page={page}
                        onPageChange={handlePageChange}
                    />
                ) : (
                    <SourcesResults
                        data={sources.data}
                        isLoading={sources.isLoading}
                        page={page}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </div>
    )
}


function PersonsResults(props: {
    data: { results: Array<{ id: string; fullName: string; photoUrl: string | null; similarity: number }>; totalCount: number } | undefined
    isLoading: boolean
    page: number
    onPageChange: (page: number) => void
}) {
    if (props.isLoading) {
        return <CircularLoader text="Recherche en cours..." />
    }

    if (!props.data || props.data.results.length === 0) {
        return (
            <p className={css({ color: "neutral/50", fontSize: "0.875rem", fontStyle: "italic" })}>
                Aucun résultat trouvé.
            </p>
        )
    }

    return (
        <div className={css({ width: "100%", display: "flex", flexDirection: "column", gap: "0.5rem" })}>
            <span className={css({ fontSize: "0.8125rem", color: "neutral/50", paddingBottom: "0.5rem" })}>
                {props.data.totalCount} résultat{props.data.totalCount > 1 ? "s" : ""}
            </span>

            {props.data.results.map((person) => (
                <Link
                    key={person.id}
                    to="/personne/$id"
                    params={{ id: person.id }}
                    className={css({
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "start",
                        alignItems: "center",
                        gap: "1rem",
                        padding: "0.75rem",
                        borderRadius: "0.5rem",
                        borderWidth: "1px",
                        borderColor: "neutral/10",
                        backgroundColor: "white",
                        transition: "all",
                        transitionDuration: "150ms",
                        _hover: {
                            borderColor: "neutral/20",
                            boxShadow: "sm",
                        },
                    })}
                >
                    {person.photoUrl ? (
                        <img
                            src={person.photoUrl}
                            alt={person.fullName}
                            className={css({
                                width: "3rem",
                                height: "3rem",
                                borderRadius: "50%",
                                objectFit: "cover",
                                flexShrink: "0",
                                backgroundColor: "neutral/5",
                            })}
                        />
                    ) : (
                        <div
                            className={css({
                                width: "3rem",
                                height: "3rem",
                                borderRadius: "50%",
                                flexShrink: "0",
                                backgroundColor: "neutral/10",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: "1rem",
                                fontWeight: "400",
                                color: "neutral/50",
                            })}
                        >
                            {person.fullName.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <span className={css({ fontSize: "1rem", fontWeight: "400", color: "neutral" })}>
                        {person.fullName}
                    </span>
                </Link>
            ))}

            <Pagination page={props.page} totalCount={props.data.totalCount} onPageChange={props.onPageChange} />
        </div>
    )
}


function FactsResults(props: {
    data: {
        results: Array<{
            id: string
            title: string
            description: string
            occurredAt: string | null
            category: string | null
            person: { id: string; fullName: string }
            similarity: number
        }>
        totalCount: number
    } | undefined
    isLoading: boolean
    page: number
    onPageChange: (page: number) => void
}) {
    if (props.isLoading) {
        return <CircularLoader text="Recherche en cours..." />
    }

    if (!props.data || props.data.results.length === 0) {
        return (
            <p className={css({ color: "neutral/50", fontSize: "0.875rem", fontStyle: "italic" })}>
                Aucun résultat trouvé.
            </p>
        )
    }

    return (
        <div className={css({ width: "100%", display: "flex", flexDirection: "column", gap: "0.5rem" })}>
            <span className={css({ fontSize: "0.8125rem", color: "neutral/50", paddingBottom: "0.5rem" })}>
                {props.data.totalCount} résultat{props.data.totalCount > 1 ? "s" : ""}
            </span>

            {props.data.results.map((fact) => (
                <div
                    key={fact.id}
                    className={css({
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                        padding: "0.75rem",
                        borderRadius: "0.5rem",
                        borderWidth: "1px",
                        borderColor: "neutral/10",
                        backgroundColor: "white",
                    })}
                >
                    <div
                        className={css({
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "start",
                            gap: "0.5rem",
                        })}
                    >
                        <span className={css({ fontSize: "1rem", fontWeight: "400", color: "neutral" })}>
                            {fact.title}
                        </span>
                        <Chip text={fact.category} />
                    </div>

                    <p
                        className={css({
                            fontSize: "0.875rem",
                            lineHeight: "1.4",
                            color: "neutral/50",
                            display: "-webkit-box",
                            WebkitLineClamp: "2",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        })}
                    >
                        {fact.description}
                    </p>

                    <div className={css({ display: "flex", flexDirection: "row", alignItems: "center", gap: "0.5rem" })}>
                        <Link
                            to="/personne/$id"
                            params={{ id: fact.person.id }}
                            className={css({
                                fontSize: "0.8125rem",
                                color: "primary",
                                _hover: { textDecoration: "underline" },
                            })}
                        >
                            {fact.person.fullName}
                        </Link>
                        {fact.occurredAt && (
                            <span className={css({ fontSize: "0.8125rem", color: "neutral/25" })}>
                                {fact.occurredAt}
                            </span>
                        )}
                    </div>
                </div>
            ))}

            <Pagination page={props.page} totalCount={props.data.totalCount} onPageChange={props.onPageChange} />
        </div>
    )
}


function SourcesResults(props: {
    data: {
        results: Array<{
            id: string
            url: string
            title: string
            publishedAt: string | null
            publisher: { id: string; name: string; logoUrl: string | null }
            fact: { id: string; title: string }
            similarity: number
        }>
        totalCount: number
    } | undefined
    isLoading: boolean
    page: number
    onPageChange: (page: number) => void
}) {
    if (props.isLoading) {
        return <CircularLoader text="Recherche en cours..." />
    }

    if (!props.data || props.data.results.length === 0) {
        return (
            <p className={css({ color: "neutral/50", fontSize: "0.875rem", fontStyle: "italic" })}>
                Aucun résultat trouvé.
            </p>
        )
    }

    return (
        <div className={css({ width: "100%", display: "flex", flexDirection: "column", gap: "0.5rem" })}>
            <span className={css({ fontSize: "0.8125rem", color: "neutral/50", paddingBottom: "0.5rem" })}>
                {props.data.totalCount} résultat{props.data.totalCount > 1 ? "s" : ""}
            </span>

            {props.data.results.map((source) => (
                <div
                    key={source.id}
                    className={css({
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                        padding: "0.75rem",
                        borderRadius: "0.5rem",
                        borderWidth: "1px",
                        borderColor: "neutral/10",
                        backgroundColor: "white",
                    })}
                >
                    <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={css({
                            fontSize: "1rem",
                            fontWeight: "400",
                            color: "primary",
                            _hover: { textDecoration: "underline" },
                            display: "flex",
                            alignItems: "center",
                            gap: "0.375rem",
                        })}
                    >
                        {source.title}
                        <IconExternalLink
                            size={14}
                            className={css({ flexShrink: "0", stroke: "primary/50" })}
                        />
                    </a>

                    <div className={css({ display: "flex", flexDirection: "row", alignItems: "center", gap: "0.5rem" })}>
                        {source.publisher.logoUrl && (
                            <img
                                src={source.publisher.logoUrl}
                                alt={source.publisher.name}
                                className={css({
                                    width: "1rem",
                                    height: "1rem",
                                    borderRadius: "0.125rem",
                                    objectFit: "contain",
                                    flexShrink: "0",
                                })}
                            />
                        )}
                        <span className={css({ fontSize: "0.8125rem", color: "neutral/50" })}>
                            {source.publisher.name}
                        </span>
                        {source.publishedAt && (
                            <span className={css({ fontSize: "0.8125rem", color: "neutral/25" })}>
                                {source.publishedAt}
                            </span>
                        )}
                    </div>

                    <span className={css({ fontSize: "0.8125rem", color: "neutral/25" })}>
                        Fait : {source.fact.title}
                    </span>
                </div>
            ))}

            <Pagination page={props.page} totalCount={props.data.totalCount} onPageChange={props.onPageChange} />
        </div>
    )
}
