import { readPoliticalPartyRouteDefinition } from "@openregistre/metadata/routes"
import { Link, useParams } from "@tanstack/react-router"
import { css } from "../../../../styled-system/css/css"
import { CircularLoader } from "../../../components/circularLoader"
import { Chip } from "../../../components/data/chip"
import { ActionBar } from "../../../components/layouts/actionBar"
import { Separator } from "../../../components/layouts/separator"
import { useDataFromAPI } from "../../../utilities/useDataFromAPI"


export function PoliticalPartyPage() {
    const { id } = useParams({ from: "/collection/parti/$id" })

    const { data, isLoading } = useDataFromAPI({
        routeDefinition: readPoliticalPartyRouteDefinition,
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
                    Parti politique introuvable.
                </p>
                <Link
                    to="/"
                    className={css({
                        color: "primary",
                        fontSize: "0.875rem",
                        _hover: { textDecoration: "underline" },
                    })}
                >
                    Retour a l'accueil
                </Link>
            </div>
        )
    }

    const currentMembers = data.persons.filter((p) => !p.endingAt)
    const pastMembers = data.persons.filter((p) => p.endingAt)

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
                {/* Party header */}
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "start",
                        alignItems: "start",
                        gap: "1.5rem",
                    })}
                >
                    {/* Logo or color dot */}
                    {data.logoUrl ? (
                        <img
                            src={data.logoUrl}
                            alt={data.name}
                            className={css({
                                width: "4rem",
                                height: "4rem",
                                borderRadius: "0.5rem",
                                objectFit: "contain",
                                flexShrink: "0",
                                backgroundColor: "neutral/5",
                            })}
                        />
                    ) : data.color ? (
                        <div
                            className={css({
                                width: "4rem",
                                height: "4rem",
                                borderRadius: "0.5rem",
                                flexShrink: "0",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            })}
                            style={{ backgroundColor: data.color }}
                        />
                    ) : null}

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
                        <Chip text="Parti politique" color="default" />
                        <h1
                            className={css({
                                fontSize: "2rem",
                                fontWeight: "400",
                                lineHeight: "1.2",
                                color: "neutral",
                            })}
                        >
                            {data.name}
                        </h1>

                        {data.abbreviation && (
                            <span
                                className={css({
                                    fontSize: "0.875rem",
                                    color: "neutral/50",
                                })}
                            >
                                {data.abbreviation}
                            </span>
                        )}

                        <span
                            className={css({
                                fontSize: "0.875rem",
                                color: "neutral/50",
                            })}
                        >
                            {data.persons.length} membre{data.persons.length > 1 ? "s" : ""}
                        </span>
                    </div>
                </div>

                <Separator />

                {/* Current members */}
                {currentMembers.length > 0 && (
                    <div
                        className={css({
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                            alignItems: "start",
                            gap: "0.75rem",
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
                            Membres actuels ({currentMembers.length})
                        </span>
                        <div
                            className={css({
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.5rem",
                            })}
                        >
                            {currentMembers.map((person) => (
                                <PersonRow key={person.id + (person.startingAt ?? "")} person={person} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Past members */}
                {pastMembers.length > 0 && (
                    <div
                        className={css({
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                            alignItems: "start",
                            gap: "0.75rem",
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
                            Anciens membres ({pastMembers.length})
                        </span>
                        <div
                            className={css({
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.5rem",
                            })}
                        >
                            {pastMembers.map((person) => (
                                <PersonRow key={person.id + (person.startingAt ?? "")} person={person} />
                            ))}
                        </div>
                    </div>
                )}

                {data.persons.length === 0 && (
                    <p
                        className={css({
                            color: "neutral/25",
                            fontSize: "0.875rem",
                            fontStyle: "italic",
                        })}
                    >
                        Aucun membre enregistre pour ce parti.
                    </p>
                )}
            </div>
        </>
    )
}


function PersonRow(props: {
    person: {
        id: string
        fullName: string
        photoUrl: string | null
        startingAt: string | null
        endingAt: string | null
    }
}) {
    const person = props.person

    return (
        <Link
            to="/collection/personne/$id"
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
                cursor: "pointer",
                transition: "all",
                transitionDuration: "150ms",
                _hover: {
                    borderColor: "neutral/20",
                    boxShadow: "sm",
                },
            })}
        >
            {/* Photo */}
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
                        fontSize: "1rem",
                        fontWeight: "400",
                        color: "neutral/50",
                    })}
                >
                    {person.fullName.charAt(0).toUpperCase()}
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
                    gap: "0.125rem",
                })}
            >
                <span className={css({ fontSize: "0.9375rem", color: "neutral" })}>
                    {person.fullName}
                </span>
                <span className={css({ fontSize: "0.75rem", color: "neutral/25" })}>
                    {person.startingAt ?? "?"} — {person.endingAt ?? "en cours"}
                </span>
            </div>
        </Link>
    )
}
