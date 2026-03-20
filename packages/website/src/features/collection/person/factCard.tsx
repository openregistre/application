import type { readPersonRouteDefinition } from "@openregistre/metadata/routes"
import { IconExternalLink } from "@tabler/icons-react"
import type * as v from "valibot"
import { css } from "../../../../styled-system/css/css"
import { Chip } from "../../../components/data/chip"


export function FactCard(props: {
    fact: v.InferOutput<typeof readPersonRouteDefinition.schemas.output>["facts"][number]
}) {
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
            {/* Header */}
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
                            flexWrap: "wrap",
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
                        {fact.tags.map((tag) => (
                            <Chip key={tag.label} text={tag.label} />
                        ))}
                    </div>
                    <p
                        className={css({
                            fontSize: "0.8125rem",
                            lineHeight: "1.4",
                            color: "neutral/50",
                            textAlign: "left",
                        })}
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
            </div>

            {/* Sources */}
            {fact.sources.length > 0 && (
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
