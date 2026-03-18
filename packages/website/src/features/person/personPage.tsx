import { readPersonRouteDefinition } from "@openregistre/metadata/routes"
import { IconChevronDown, IconChevronRight, IconExternalLink, IconLink } from "@tabler/icons-react"
import { Link, useParams } from "@tanstack/react-router"
import { useState } from "react"
import type * as v from "valibot"
import { css } from "../../../styled-system/css/css"
import { cx } from "../../../styled-system/css/cx"
import { Button } from "../../components/button/button"
import { Chip } from "../../components/data/chip"
import { CircularLoader } from "../../components/circularLoader"
import { ActionBar } from "../../components/layouts/actionBar"
import { Separator } from "../../components/layouts/separator"
import { useDataFromAPI } from "../../utilities/useDataFromAPI"


type PersonOutput = v.InferOutput<typeof readPersonRouteDefinition.schemas.output>
type FactView = "chronologique" | "catégorie" | "liste"

const factViews: Array<{ key: FactView; label: string }> = [
    { key: "chronologique", label: "Chronologique" },
    { key: "catégorie", label: "Par catégorie" },
    { key: "liste", label: "Liste" },
]

export function PersonPage() {
    const { id } = useParams({ from: "/bibliotheque/personne/$id" })
    const [factView, setFactView] = useState<FactView>("chronologique")

    const { data, isLoading } = useDataFromAPI({
        routeDefinition: readPersonRouteDefinition,
        body: { id },
    })

    if (isLoading) {
        return (
            <div
                className={css({
                    width: "100%",
                    flex: "1",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                })}
            >
                <CircularLoader text="Chargement..." />
            </div>
        )
    }

    if (!data) {
        return (
            <div
                className={css({
                    width: "100%",
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem",
                })}
            >
                <p className={css({ color: "neutral/50", fontStyle: "italic" })}>
                    Personne introuvable.
                </p>
                <Link
                    to="/"
                    className={css({
                        color: "primary",
                        fontSize: "0.875rem",
                        _hover: { textDecoration: "underline" },
                    })}
                >
                    Retour à l'accueil
                </Link>
            </div>
        )
    }

    const currentRoles = data.roles.filter((r) => !r.endingAt)
    const currentParties = data.politicalParties.filter((p) => !p.endingAt)

    return (
        <>
            <ActionBar
                share={{
                    title: data.fullName,
                    description: buildPersonShareDescription(data),
                    hashtags: ["OpenRegistre", "Politique"],
                }}
            />

            {/* Content */}
            <div
                className={css({
                    width: "100%",
                    maxWidth: "64rem",
                    marginX: "auto",
                    paddingX: "1.5rem",
                    paddingY: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "start",
                    gap: "2rem",
                })}
            >
                {/* Person header */}
                <div
                    className={css({
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "start",
                        alignItems: "start",
                        gap: "1.5rem",
                    })}
                >
                    {/* Photo */}
                    {data.photoUrl ? (
                        <img
                            src={data.photoUrl}
                            alt={data.fullName}
                            className={css({
                                width: "6rem",
                                height: "6rem",
                                borderRadius: "50%",
                                objectFit: "cover",
                                flexShrink: "0",
                                backgroundColor: "neutral/5",
                            })}
                        />
                    ) : (
                        <div
                            className={css({
                                width: "6rem",
                                height: "6rem",
                                borderRadius: "50%",
                                flexShrink: "0",
                                backgroundColor: "neutral/10",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: "2rem",
                                fontWeight: "400",
                                color: "neutral/50",
                            })}
                        >
                            {data.fullName.charAt(0).toUpperCase()}
                        </div>
                    )}

                    {/* Info */}
                    <div
                        className={css({
                            flex: "1",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                            alignItems: "start",
                            gap: "0.5rem",
                        })}
                    >
                        <h1
                            className={css({
                                fontSize: "2rem",
                                fontWeight: "400",
                                lineHeight: "1.2",
                                color: "neutral",
                            })}
                        >
                            {data.fullName}
                        </h1>

                        {data.birthDate && (
                            <span
                                className={css({
                                    fontSize: "0.875rem",
                                    color: "neutral/50",
                                })}
                            >
                                Né(e) le {data.birthDate}
                            </span>
                        )}

                        {/* Current roles */}
                        {currentRoles.length > 0 && (
                            <div
                                className={css({
                                    display: "flex",
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    gap: "0.25rem",
                                })}
                            >
                                {currentRoles.map((role) => (
                                    <Link key={role.id} to="/bibliotheque/role/$id" params={{ id: role.id }}>
                                        <Chip text={role.label} color="information" className={{ cursor: "pointer", _hover: { opacity: "0.8" } }} />
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Current political parties */}
                        {currentParties.length > 0 && (
                            <div
                                className={css({
                                    display: "flex",
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    gap: "0.25rem",
                                    alignItems: "center",
                                })}
                            >
                                {currentParties.map((party) => (
                                    <Link key={party.id} to="/bibliotheque/parti/$id" params={{ id: party.id }}>
                                        <Chip text={party.abbreviation || party.name} color="default" className={{ cursor: "pointer", _hover: { opacity: "0.8" } }} />
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Links */}
                        {data.links && data.links.length > 0 && (
                            <div
                                className={css({
                                    display: "flex",
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    gap: "0.5rem",
                                    paddingTop: "0.25rem",
                                })}
                            >
                                {data.links.map((link) => (
                                    <a
                                        key={link}
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={css({
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.25rem",
                                            fontSize: "0.8125rem",
                                            color: "primary",
                                            _hover: {
                                                textDecoration: "underline",
                                            },
                                        })}
                                    >
                                        <IconLink size={12} />
                                        {new URL(link).hostname}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <Separator />

                {/* Roles & Parties history */}
                <div
                    className={css({
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "start",
                        alignItems: "start",
                        gap: "2rem",
                        md: {
                            flexDirection: "row",
                        },
                        flexWrap: "wrap",
                    })}
                >
                    {/* All roles */}
                    {data.roles.length > 0 && (
                        <div
                            className={css({
                                flex: "1",
                                minWidth: "16rem",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "start",
                                alignItems: "start",
                                gap: "0.5rem",
                            })}
                        >
                            <span
                                className={css({
                                    fontSize: "0.8125rem",
                                    fontWeight: "400",
                                    color: "neutral/50",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.05em",
                                })}
                            >
                                Rôles
                            </span>
                            {data.roles.map((role) => (
                                <div
                                    key={role.id + (role.startingAt ?? "")}
                                    className={css({
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "start",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                    })}
                                >
                                    <Link
                                        to="/bibliotheque/role/$id"
                                        params={{ id: role.id }}
                                        className={css({
                                            fontSize: "0.875rem",
                                            color: "neutral",
                                            _hover: { color: "primary", textDecoration: "underline" },
                                        })}
                                    >
                                        {role.label}
                                    </Link>
                                    <span className={css({ fontSize: "0.75rem", color: "neutral/25" })}>
                                        {role.startingAt ?? "?"} — {role.endingAt ?? "en cours"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* All parties */}
                    {data.politicalParties.length > 0 && (
                        <div
                            className={css({
                                flex: "1",
                                minWidth: "16rem",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "start",
                                alignItems: "start",
                                gap: "0.5rem",
                            })}
                        >
                            <span
                                className={css({
                                    fontSize: "0.8125rem",
                                    fontWeight: "400",
                                    color: "neutral/50",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.05em",
                                })}
                            >
                                Partis politiques
                            </span>
                            {data.politicalParties.map((party) => (
                                <div
                                    key={party.id + (party.startingAt ?? "")}
                                    className={css({
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "start",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                    })}
                                >
                                    {party.color && (
                                        <div
                                            className={css({
                                                width: "0.5rem",
                                                height: "0.5rem",
                                                borderRadius: "50%",
                                                flexShrink: "0",
                                            })}
                                            style={{ backgroundColor: party.color }}
                                        />
                                    )}
                                    <Link
                                        to="/bibliotheque/parti/$id"
                                        params={{ id: party.id }}
                                        className={css({
                                            fontSize: "0.875rem",
                                            color: "neutral",
                                            _hover: { color: "primary", textDecoration: "underline" },
                                        })}
                                    >
                                        {party.name}
                                        {party.abbreviation && ` (${party.abbreviation})`}
                                    </Link>
                                    <span className={css({ fontSize: "0.75rem", color: "neutral/25" })}>
                                        {party.startingAt ?? "?"} — {party.endingAt ?? "en cours"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <Separator />

                {/* Facts section */}
                <div
                    className={css({
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "start",
                        gap: "1rem",
                    })}
                >
                    {/* Header with view toggle */}
                    <div
                        className={css({
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        })}
                    >
                        <span
                            className={css({
                                fontSize: "0.8125rem",
                                fontWeight: "400",
                                color: "neutral/50",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                            })}
                        >
                            Faits ({data.facts.length})
                        </span>
                        <div
                            className={css({
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "0.25rem",
                                borderRadius: "0.375rem",
                                borderWidth: "1px",
                                borderColor: "neutral/10",
                                backgroundColor: "neutral/5",
                                padding: "0.125rem",
                            })}
                        >
                            {factViews.map((view) => (
                                <button
                                    key={view.key}
                                    type="button"
                                    onClick={() => setFactView(view.key)}
                                    className={css(
                                        {
                                            paddingX: "0.5rem",
                                            paddingY: "0.25rem",
                                            borderRadius: "0.25rem",
                                            fontSize: "0.75rem",
                                            lineHeight: "1rem",
                                            cursor: "pointer",
                                            backgroundColor: "transparent",
                                            color: "neutral/50",
                                            borderWidth: "1px",
                                            borderColor: "transparent",
                                            transition: "all",
                                            transitionDuration: "150ms",
                                        },
                                        factView === view.key
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
                                    {view.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Facts list */}
                    {data.facts.length === 0 ? (
                        <p
                            className={css({
                                color: "neutral/25",
                                fontSize: "0.875rem",
                                fontStyle: "italic",
                            })}
                        >
                            Aucun fait enregistré.
                        </p>
                    ) : (
                        <FactList facts={data.facts} view={factView} />
                    )}
                </div>
            </div>
        </>
    )
}


function buildPersonShareDescription(data: PersonOutput): string {
    const parts: Array<string> = []

    const currentRoles = data.roles.filter((r) => !r.endingAt)
    if (currentRoles.length > 0) {
        parts.push(currentRoles.map((r) => r.label).join(", "))
    }

    const currentParties = data.politicalParties.filter((p) => !p.endingAt)
    if (currentParties.length > 0) {
        parts.push(currentParties.map((p) => p.abbreviation || p.name).join(", "))
    }

    if (data.facts.length > 0) {
        parts.push(`${data.facts.length} fait${data.facts.length > 1 ? "s" : ""} enregistre${data.facts.length > 1 ? "s" : ""}`)
    }

    return parts.length > 0
        ? parts.join(" | ")
        : "Fiche sur OpenRegistre"
}


function FactList(props: { facts: PersonOutput["facts"]; view: FactView }) {
    const sorted = [...props.facts]

    if (props.view === "chronologique") {
        sorted.sort((a, b) => {
            if (!a.occurredAt && !b.occurredAt) return 0
            if (!a.occurredAt) return 1
            if (!b.occurredAt) return -1
            return b.occurredAt.localeCompare(a.occurredAt)
        })
    }

    if (props.view === "catégorie") {
        const groups = new Map<string, PersonOutput["facts"]>()
        for (const fact of sorted) {
            const cat = fact.category ?? "Non catégorisé"
            if (!groups.has(cat)) groups.set(cat, [])
            groups.get(cat)!.push(fact)
        }

        return (
            <div
                className={css({
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                })}
            >
                {Array.from(groups.entries()).map(([category, facts]) => (
                    <div
                        key={category}
                        className={css({
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                        })}
                    >
                        <Chip text={category} />
                        {facts.map((fact) => (
                            <FactCard key={fact.id} fact={fact} />
                        ))}
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div
            className={css({
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
            })}
        >
            {sorted.map((fact) => (
                <FactCard key={fact.id} fact={fact} />
            ))}
        </div>
    )
}


function FactCard(props: { fact: PersonOutput["facts"][number] }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const fact = props.fact

    return (
        <div
            className={css({
                width: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: "0.5rem",
                borderWidth: "1px",
                borderColor: "neutral/10",
                backgroundColor: "white",
                overflow: "hidden",
            })}
        >
            {/* Header — always visible */}
            <Button
                onClick={() => setIsExpanded(!isExpanded)}
                className={css({ width: "100%" })}
            >
                <div
                    className={css({
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "start",
                        padding: "0.75rem",
                        gap: "0.5rem",
                    })}
                >
                    <div
                        className={css({
                            flex: "1",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                            alignItems: "start",
                            gap: "0.375rem",
                        })}
                    >
                        <div
                            className={css({
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "start",
                                alignItems: "center",
                                gap: "0.5rem",
                            })}
                        >
                            <span
                                className={css({
                                    fontSize: "0.9375rem",
                                    fontWeight: "400",
                                    color: "neutral",
                                    textAlign: "left",
                                })}
                            >
                                {fact.title}
                            </span>
                            <Chip text={fact.category} />
                        </div>
                        <p
                            className={cx(
                                css({
                                    fontSize: "0.8125rem",
                                    lineHeight: "1.4",
                                    color: "neutral/50",
                                    textAlign: "left",
                                }),
                                !isExpanded
                                    ? css({
                                        display: "-webkit-box",
                                        WebkitLineClamp: "2",
                                        // @ts-expect-error WebkitBoxOrient is valid CSS but not in PandaCSS types
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    })
                                    : "",
                            )}
                        >
                            {fact.description}
                        </p>
                        {fact.occurredAt && (
                            <span
                                className={css({
                                    fontSize: "0.75rem",
                                    color: "neutral/25",
                                })}
                            >
                                {fact.occurredAt}
                            </span>
                        )}
                    </div>
                    <div
                        className={css({
                            flexShrink: "0",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingTop: "0.125rem",
                        })}
                    >
                        {isExpanded ? (
                            <IconChevronDown
                                size={16}
                                className={css({ stroke: "neutral/25" })}
                            />
                        ) : (
                            <IconChevronRight
                                size={16}
                                className={css({ stroke: "neutral/25" })}
                            />
                        )}
                    </div>
                </div>
            </Button>

            {/* Sources — expandable */}
            {isExpanded && fact.sources.length > 0 && (
                <div
                    className={css({
                        width: "100%",
                        borderTopWidth: "1px",
                        borderTopColor: "neutral/10",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                        padding: "0.75rem",
                        backgroundColor: "neutral/2",
                    })}
                >
                    <span
                        className={css({
                            fontSize: "0.75rem",
                            color: "neutral/25",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                        })}
                    >
                        Sources ({fact.sources.length})
                    </span>
                    {fact.sources.map((source) => (
                        <div
                            key={source.id}
                            className={css({
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.25rem",
                            })}
                        >
                            <a
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={css({
                                    fontSize: "0.875rem",
                                    color: "primary",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.25rem",
                                    _hover: { textDecoration: "underline" },
                                })}
                            >
                                {source.title}
                                <IconExternalLink size={12} className={css({ stroke: "primary/50", flexShrink: "0" })} />
                            </a>
                            <div
                                className={css({
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: "0.5rem",
                                    alignItems: "center",
                                })}
                            >
                                {source.publisher.logoUrl && (
                                    <img
                                        src={source.publisher.logoUrl}
                                        alt={source.publisher.name}
                                        className={css({
                                            width: "0.875rem",
                                            height: "0.875rem",
                                            borderRadius: "0.125rem",
                                            objectFit: "contain",
                                            flexShrink: "0",
                                        })}
                                    />
                                )}
                                <span className={css({ fontSize: "0.75rem", color: "neutral/50" })}>
                                    {source.publisher.name}
                                </span>
                                {source.publishedAt && (
                                    <span className={css({ fontSize: "0.75rem", color: "neutral/25" })}>
                                        {source.publishedAt}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
