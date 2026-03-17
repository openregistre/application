import { models } from "@openregistre/metadata/orm"
import { upsertPoliticalPartyRouteDefinition } from "@openregistre/metadata/routes"
import { generateId } from "@openregistre/metadata/utilities"
import { eq } from "drizzle-orm"
import { checkApiKeyMiddleware } from "../../../middlewares/checkApiKey.middleware.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { routeHandler } from "../../../utilities/api/routeHandler.js"
import { Clients } from "../../../utilities/clients.js"
import { routeResponse } from "../../../utilities/route/routeResponse.js"


export const upsertPoliticalPartyRoute = routeHandler({
    definition: upsertPoliticalPartyRouteDefinition,
    handler: async ({ context }) => {
        await checkApiKeyMiddleware({ context })
        const body = await validateBodyMiddleware({
            context: context,
            schema: upsertPoliticalPartyRouteDefinition.schemas.input,
        })

        // PoliticalParty has unique name — find existing
        const existing = await Clients.platformPostgresql
            .select()
            .from(models.politicalParty)
            .where(eq(models.politicalParty.name, body.name))

        if (existing.length === 1) {
            const updated = await Clients.platformPostgresql
                .update(models.politicalParty)
                .set({
                    abbreviation: body.abbreviation ?? existing[0].abbreviation,
                    logoUrl: body.logoUrl ?? existing[0].logoUrl,
                    color: body.color ?? existing[0].color,
                    lastUpdatedAt: new Date().toISOString(),
                })
                .where(eq(models.politicalParty.id, existing[0].id))
                .returning()

            return routeResponse({
                context: context,
                statusCode: 200,
                bodyValue: {
                    id: updated[0].id,
                },
            })
        }

        // Insert new
        const created = await Clients.platformPostgresql
            .insert(models.politicalParty)
            .values({
                id: generateId(),
                name: body.name,
                abbreviation: body.abbreviation ?? null,
                logoUrl: body.logoUrl ?? null,
                color: body.color ?? null,
                lastUpdatedAt: null,
                createdAt: new Date().toISOString(),
            })
            .returning()

        return routeResponse({
            context: context,
            statusCode: 200,
            bodyValue: {
                id: created[0].id,
            },
        })
    },
})
