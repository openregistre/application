import { readPersonRouteDefinition } from "@openregistre/metadata/routes"
import { IconArrowsSort, IconFilter, IconSortAscending, IconSortDescending } from "@tabler/icons-react"
import { useMemo, useState } from "react"
import type * as v from "valibot"
import { css } from "../../../../styled-system/css/css"
import { Button } from "../../../components/button/button.tsx"
import { ButtonOutlineContent } from "../../../components/button/buttonOutlineContent.tsx"
import { Popover } from "../../../components/layouts/popover.tsx"
import { FactCard } from "./factCard.tsx"


export function FactList(props: { facts: v.InferOutput<typeof readPersonRouteDefinition.schemas.output>["facts"] }) {
    const [sortDirection, setSortDirection] = useState<"desc" | "asc">("desc")

    // Extract all unique tag labels for the filter
    const allTags = useMemo(
        () =>
            Array.from(
                new Set(props.facts.flatMap((f) => f.tags.length > 0 ? f.tags.map((t) => t.label) : ["Non catégorisé"])),
            ).sort(),
        [props.facts],
    )

    const [enabledTags, setEnabledTags] = useState<Set<string>>(
        () => new Set(allTags),
    )

    function toggleTag(tag: string) {
        setEnabledTags((prev) => {
            const next = new Set(prev)
            if (next.has(tag)) {
                next.delete(tag)
            } else {
                next.add(tag)
            }
            return next
        })
    }

    const activeFilterCount = allTags.length - enabledTags.size

    const filteredAndSorted = useMemo(() => {
        const filtered = props.facts.filter((fact) => {
            const labels = fact.tags.length > 0 ? fact.tags.map((t) => t.label) : ["Non catégorisé"]
            return labels.some((label) => enabledTags.has(label))
        })

        filtered.sort((a, b) => {
            if (!a.occurredAt && !b.occurredAt) return 0
            if (!a.occurredAt) return 1
            if (!b.occurredAt) return -1
            return sortDirection === "desc"
                ? b.occurredAt.localeCompare(a.occurredAt)
                : a.occurredAt.localeCompare(b.occurredAt)
        })

        return filtered
    }, [props.facts, enabledTags, sortDirection])

    return (
        <div
            className={css({
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            })}
        >
            {/* Controls: filter + sort popovers */}
            <div
                className={css({
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "end",
                    alignItems: "center",
                    gap: "0.5rem",
                })}
            >
                {/* Filter popover */}
                <Popover
                    triggerElement={
                        <button>
                            <ButtonOutlineContent
                                leftIcon={<IconFilter />}
                                text={activeFilterCount > 0 ? `Filtres (${activeFilterCount})` : "Filtres"}
                            />
                        </button>
                    }
                    position="bottom"
                    align="end"
                >
                    {() => (
                        <div
                            className={css({
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "start",
                                alignItems: "start",
                                gap: "0.5rem",
                                padding: "0.75rem",
                                maxHeight: "20rem",
                                overflowY: "auto",
                            })}
                        >
                            {/* Select / Deselect all */}
                            <Button
                                onClick={() => {
                                    const allEnabled = enabledTags.size === allTags.length
                                    setEnabledTags(allEnabled ? new Set() : new Set(allTags))
                                }}
                            >
                                <span
                                    className={css({
                                        fontSize: "0.8125rem",
                                        fontWeight: "500",
                                        color: "primary",
                                        cursor: "pointer",
                                        _hover: { textDecoration: "underline" },
                                    })}
                                >
                                    {enabledTags.size === allTags.length ? "Tout désélectionner" : "Tout sélectionner"}
                                </span>
                            </Button>

                            {/* Tag checkboxes */}
                            {allTags.map((tag) => (
                                <label
                                    key={tag}
                                    className={css({
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "start",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                        cursor: "pointer",
                                        whiteSpace: "nowrap",
                                    })}
                                >
                                    <input
                                        type="checkbox"
                                        checked={enabledTags.has(tag)}
                                        onChange={() => toggleTag(tag)}
                                        className={css({ cursor: "pointer" })}
                                    />
                                    <span
                                        className={css({
                                            fontSize: "0.8125rem",
                                            color: "neutral",
                                        })}
                                    >
                                        {tag}
                                    </span>
                                </label>
                            ))}
                        </div>
                    )}
                </Popover>

                {/* Sort popover */}
                <Popover
                    triggerElement={
                        <button>
                            <ButtonOutlineContent
                                leftIcon={<IconArrowsSort />}
                                text={sortDirection === "desc" ? "Plus récent" : "Plus ancien"}
                            />
                        </button>
                    }
                    position="bottom"
                    align="end"
                >
                    {({ setIsOpen }) => (
                        <div
                            className={css({
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "start",
                                alignItems: "start",
                            })}
                        >
                            <Button
                                onClick={() => {
                                    setSortDirection("desc")
                                    setIsOpen(false)
                                }}
                            >
                                <div
                                    className={css(
                                        {
                                            width: "100%",
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "start",
                                            alignItems: "center",
                                            gap: "0.5rem",
                                            paddingX: "0.75rem",
                                            paddingY: "0.5rem",
                                            cursor: "pointer",
                                            _hover: { backgroundColor: "neutral/5" },
                                            transition: "all",
                                            transitionDuration: "100ms",
                                        },
                                        sortDirection === "desc" ? { backgroundColor: "primary/5" } : {},
                                    )}
                                >
                                    <IconSortDescending
                                        size={16}
                                        className={css({
                                            flexShrink: "0",
                                            stroke: sortDirection === "desc" ? "primary" : "neutral/50",
                                        })}
                                    />
                                    <span
                                        className={css({
                                            fontSize: "0.8125rem",
                                            whiteSpace: "nowrap",
                                            color: sortDirection === "desc" ? "primary" : "neutral",
                                        })}
                                    >
                                        Plus récent d'abord
                                    </span>
                                </div>
                            </Button>
                            <Button
                                onClick={() => {
                                    setSortDirection("asc")
                                    setIsOpen(false)
                                }}
                            >
                                <div
                                    className={css(
                                        {
                                            width: "100%",
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "start",
                                            alignItems: "center",
                                            gap: "0.5rem",
                                            paddingX: "0.75rem",
                                            paddingY: "0.5rem",
                                            cursor: "pointer",
                                            _hover: { backgroundColor: "neutral/5" },
                                            transition: "all",
                                            transitionDuration: "100ms",
                                        },
                                        sortDirection === "asc" ? { backgroundColor: "primary/5" } : {},
                                    )}
                                >
                                    <IconSortAscending
                                        size={16}
                                        className={css({
                                            flexShrink: "0",
                                            stroke: sortDirection === "asc" ? "primary" : "neutral/50",
                                        })}
                                    />
                                    <span
                                        className={css({
                                            fontSize: "0.8125rem",
                                            whiteSpace: "nowrap",
                                            color: sortDirection === "asc" ? "primary" : "neutral",
                                        })}
                                    >
                                        Plus ancien d'abord
                                    </span>
                                </div>
                            </Button>
                        </div>
                    )}
                </Popover>
            </div>

            {/* Facts list */}
            {filteredAndSorted.length === 0 ? (
                <p
                    className={css({
                        color: "neutral/25",
                        fontSize: "0.875rem",
                        fontStyle: "italic",
                    })}
                >
                    Aucun fait ne correspond aux filtres sélectionnés.
                </p>
            ) : (
                <div
                    className={css({
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                    })}
                >
                    {filteredAndSorted.map((fact) => (
                        <FactCard key={fact.id} fact={fact} />
                    ))}
                </div>
            )}
        </div>
    )
}
