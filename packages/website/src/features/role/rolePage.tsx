import { readRoleRouteDefinition } from "@openregistre/metadata/routes"
import { Link, useParams } from "@tanstack/react-router"
import { css } from "../../../styled-system/css/css"
import { CircularLoader } from "../../components/circularLoader"
import { Chip } from "../../components/data/chip"
import { ActionBar } from "../../components/layouts/actionBar"
import { Separator } from "../../components/layouts/separator"
import { useDataFromAPI } from "../../utilities/useDataFromAPI"


export function RolePage() {
    const { id } = useParams({ from: "/bibliotheque/role/$id" })

    const { data, isLoading } = useDataFromAPI({
        routeDefinition: readRoleRouteDefinition,
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
                    Role introuvable.
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

    const currentPersons = data.persons.filter((p) => !p.endingAt)
    const pastPersons = data.persons.filter((p) => p.endingAt)

    return (
        <>
            <ActionBar
                share={{
                    title: data.label,
                    description: `${data.persons.length} personne${data.persons.length > 1 ? "s" : ""} | Role sur OpenRegistre`,
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
                {/* Role header */}
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "start",
                        gap: "0.5rem",
                    })}
                >
                    <Chip text="Role" color="information" />
                    <h1
                        className={css({
                            fontSize: "2rem",
                            fontWeight: "400",
                            lineHeight: "1.2",
                            color: "neutral",
                        })}
                    >
                        {data.label}
                    </h1>
                    <span
                        className={css({
                            fontSize: "0.875rem",
                            color: "neutral/50",
                        })}
                    >
                        {data.persons.length} personne{data.persons.length > 1 ? "s" : ""}
                    </span>
                </div>

                <Separator />

                {/* Current holders */}
                {currentPersons.length > 0 && (
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
                            En cours ({currentPersons.length})
                        </span>
                        <div
                            className={css({
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.5rem",
                            })}
                        >
                            {currentPersons.map((person) => (
                                <PersonRow key={person.id + (person.startingAt ?? "")} person={person} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Past holders */}
                {pastPersons.length > 0 && (
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
                            Anciens ({pastPersons.length})
                        </span>
                        <div
                            className={css({
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.5rem",
                            })}
                        >
                            {pastPersons.map((person) => (
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
                        Aucune personne enregistree pour ce role.
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
