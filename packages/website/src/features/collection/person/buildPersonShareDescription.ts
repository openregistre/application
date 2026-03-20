import { readPersonRouteDefinition } from "@openregistre/metadata/routes"
import type * as v from "valibot"


export function buildPersonShareDescription(data: v.InferOutput<typeof readPersonRouteDefinition.schemas.output>): string {
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

