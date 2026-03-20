import { readPersonRouteDefinition } from "@openregistre/metadata/routes"
import { IconLink } from "@tabler/icons-react"
import { Link, useParams } from "@tanstack/react-router"
import { css } from "../../../../styled-system/css/css"
import { CircularLoader } from "../../../components/circularLoader"
import { Chip } from "../../../components/data/chip"
import { ActionBar } from "../../../components/layouts/actionBar"
import { Separator } from "../../../components/layouts/separator"
import { useDataFromAPI } from "../../../utilities/useDataFromAPI"
import { FactList } from "./factList.tsx"


export function PersonPage() {
    const { id } = useParams({ from: "/collection/personne/$id" })

    const { data, isLoading } = useDataFromAPI({
        routeDefinition: readPersonRouteDefinition,
        body: { id },
    })

    if (isLoading) {
        return (
            <div
                className={css({
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem",
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
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem",
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
                    Chercher une nouvelle personne
                </Link>
            </div>
        )
    }

    const currentRoles = data.roles.filter((r) => !r.endingAt)
    const currentParties = data.politicalParties.filter((p) => !p.endingAt)

    return (
        <>
            <ActionBar
                share
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
                    {data.photoUrl
                        ? (
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
                        )
                        : (
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
                                    <Link key={role.id} to="/collection/fonction/$id" params={{ id: role.id }}>
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
                                    <Link key={party.id} to="/collection/parti/$id" params={{ id: party.id }}>
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
                                    flexDirection: "column",
                                    flexWrap: "wrap",
                                    gap: "0.25rem",
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
                                        to="/collection/fonction/$id"
                                        params={{ id: role.id }}
                                        className={css({
                                            fontSize: "0.875rem",
                                            color: "neutral",
                                            _hover: { color: "primary", textDecoration: "underline" },
                                        })}
                                    >
                                        {role.label}
                                    </Link>
                                    <span className={css({ fontSize: "0.75rem", color: "neutral/50" })}>
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
                                        to="/collection/parti/$id"
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
                                    <span className={css({ fontSize: "0.75rem", color: "neutral/50" })}>
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
                        <FactList facts={data.facts} />
                    )}
                </div>
            </div>
        </>
    )
}
