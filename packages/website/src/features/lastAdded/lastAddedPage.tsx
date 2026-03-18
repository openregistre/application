import { lastAddedRouteDefinition } from "@openregistre/metadata/routes"
import { IconExternalLink } from "@tabler/icons-react"
import { Link } from "@tanstack/react-router"
import { useState } from "react"
import { css } from "../../../styled-system/css/css"
import { CircularLoader } from "../../components/circularLoader"
import { Chip } from "../../components/data/chip"
import { useDataFromAPI } from "../../utilities/useDataFromAPI"


type Tab = "personnes" | "faits" | "sources"

const tabs: Array<{ key: Tab; label: string }> = [
    { key: "personnes", label: "Personnes" },
    { key: "faits", label: "Faits" },
    { key: "sources", label: "Sources" },
]


export function LastAddedPage() {
    const [activeTab, setActiveTab] = useState<Tab>("personnes")

    const { data, isLoading } = useDataFromAPI({
        routeDefinition: lastAddedRouteDefinition,
        body: {},
    })

    return (
        <div
            className={css({
                width: "100%",
                maxWidth: "64rem",
                marginX: "auto",
                paddingX: "1.5rem",
                paddingY: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
            })}
        >
                <div className={css({ display: "flex", flexDirection: "column", gap: "0.25rem" })}>
                    <h1
                        className={css({
                            fontSize: "1.75rem",
                            fontWeight: "400",
                            color: "neutral",
                            letterSpacing: "-0.02em",
                        })}
                    >
                        Derniers ajouts
                    </h1>
                    <p className={css({ fontSize: "0.875rem", color: "neutral/50", lineHeight: "1.5" })}>
                        Les personnes, faits et sources les plus récemment ajoutés à la base de données.
                    </p>
                </div>

                {/* Tabs */}
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "0.25rem",
                        borderRadius: "0.375rem",
                        borderWidth: "1px",
                        borderColor: "neutral/10",
                        backgroundColor: "neutral/5",
                        padding: "0.125rem",
                        alignSelf: "start",
                    })}
                >
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => setActiveTab(tab.key)}
                            className={css(
                                {
                                    paddingX: "0.75rem",
                                    paddingY: "0.375rem",
                                    borderRadius: "0.25rem",
                                    fontSize: "0.8125rem",
                                    lineHeight: "1rem",
                                    cursor: "pointer",
                                    backgroundColor: "transparent",
                                    color: "neutral/50",
                                    borderWidth: "1px",
                                    borderColor: "transparent",
                                    transition: "all",
                                    transitionDuration: "150ms",
                                },
                                activeTab === tab.key
                                    ? {
                                        backgroundColor: "white",
                                        color: "neutral",
                                        borderColor: "neutral/15",
                                        boxShadow: "sm",
                                    }
                                    : {
                                        _hover: { color: "neutral/75" },
                                    },
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab content */}
                {isLoading ? (
                    <CircularLoader text="Chargement..." />
                ) : data ? (
                    <div className={css({ display: "flex", flexDirection: "column", gap: "0.5rem" })}>
                        {activeTab === "personnes" && (
                            data.persons.length === 0 ? (
                                <EmptyState text="Aucune personne ajoutée." />
                            ) : (
                                data.persons.map((person) => (
                                    <Link
                                        key={person.id}
                                        to="/bibliotheque/personne/$id"
                                        params={{ id: person.id }}
                                        className={css({
                                            width: "100%",
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "start",
                                            alignItems: "center",
                                            gap: "0.75rem",
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
                                                    width: "2.5rem",
                                                    height: "2.5rem",
                                                    borderRadius: "50%",
                                                    objectFit: "cover",
                                                    flexShrink: "0",
                                                    backgroundColor: "neutral/5",
                                                })}
                                            />
                                        ) : (
                                            <div
                                                className={css({
                                                    width: "2.5rem",
                                                    height: "2.5rem",
                                                    borderRadius: "50%",
                                                    flexShrink: "0",
                                                    backgroundColor: "neutral/10",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    fontSize: "0.875rem",
                                                    fontWeight: "400",
                                                    color: "neutral/50",
                                                })}
                                            >
                                                {person.fullName.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                        <div className={css({ display: "flex", flexDirection: "column", gap: "0.125rem" })}>
                                            <span className={css({ fontSize: "0.875rem", fontWeight: "400", color: "neutral" })}>
                                                {person.fullName}
                                            </span>
                                            <span className={css({ fontSize: "0.75rem", color: "neutral/25" })}>
                                                {formatDate(person.createdAt)}
                                            </span>
                                        </div>
                                    </Link>
                                ))
                            )
                        )}

                        {activeTab === "faits" && (
                            data.facts.length === 0 ? (
                                <EmptyState text="Aucun fait ajouté." />
                            ) : (
                                data.facts.map((fact) => (
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
                                            <span className={css({ fontSize: "0.875rem", fontWeight: "400", color: "neutral" })}>
                                                {fact.title}
                                            </span>
                                            <Chip text={fact.category} />
                                        </div>

                                        <p
                                            className={css({
                                                fontSize: "0.8125rem",
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
                                                to="/bibliotheque/personne/$id"
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
                                                <span className={css({ fontSize: "0.75rem", color: "neutral/25" })}>
                                                    {fact.occurredAt}
                                                </span>
                                            )}
                                            <span className={css({ fontSize: "0.75rem", color: "neutral/25" })}>
                                                {formatDate(fact.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )
                        )}

                        {activeTab === "sources" && (
                            data.sources.length === 0 ? (
                                <EmptyState text="Aucune source ajoutée." />
                            ) : (
                                data.sources.map((source) => (
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
                                                fontSize: "0.875rem",
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
                                                <span className={css({ fontSize: "0.75rem", color: "neutral/25" })}>
                                                    {source.publishedAt}
                                                </span>
                                            )}
                                        </div>

                                        <div className={css({ display: "flex", flexDirection: "row", alignItems: "center", gap: "0.5rem" })}>
                                            <span className={css({ fontSize: "0.8125rem", color: "neutral/25" })}>
                                                Fait : {source.fact.title}
                                            </span>
                                            <span className={css({ fontSize: "0.75rem", color: "neutral/25" })}>
                                                {formatDate(source.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )
                        )}
                    </div>
                ) : null}
            </div>
    )
}


function EmptyState(props: { text: string }) {
    return (
        <p className={css({ color: "neutral/50", fontSize: "0.875rem", fontStyle: "italic" })}>
            {props.text}
        </p>
    )
}


function formatDate(isoString: string): string {
    try {
        const date = new Date(isoString)
        return date.toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
    } catch {
        return isoString
    }
}
