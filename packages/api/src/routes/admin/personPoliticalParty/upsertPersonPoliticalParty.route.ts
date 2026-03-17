import { models } from "@openregistre/metadata/orm"
import { upsertPersonPoliticalPartyRouteDefinition } from "@openregistre/metadata/routes"
import { generateId } from "@openregistre/metadata/utilities"
import { and, eq } from "drizzle-orm"
import { checkApiKeyMiddleware } from "../../../middlewares/checkApiKey.middleware.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { routeHandler } from "../../../utilities/api/routeHandler.js"
import { Clients } from "../../../utilities/clients.js"
import { routeResponse } from "../../../utilities/route/routeResponse.js"


export const upsertPersonPoliticalPartyRoute = routeHandler({
    definition: upsertPersonPoliticalPartyRouteDefinition,
    handler: async ({ context }) => {
        await checkApiKeyMiddleware({ context })
        const body = await validateBodyMiddleware({
            context: context,
            schema: upsertPersonPoliticalPartyRouteDefinition.schemas.input,
        })

        // Find existing by person + politicalParty combination
        const existing = await Clients.platformPostgresql
            .select()
            .from(models.personPoliticalParty)
            .where(and(
                eq(models.personPoliticalParty.idPerson, body.idPerson),
                eq(models.personPoliticalParty.idPoliticalParty, body.idPoliticalParty),
            ))

        if (existing.length === 1) {
            const updated = await Clients.platformPostgresql
                .update(models.personPoliticalParty)
                .set({
                    startingAt: body.startingAt ?? existing[0].startingAt,
                    endingAt: body.endingAt ?? existing[0].endingAt,
                    lastUpdatedAt: new Date().toISOString(),
                })
                .where(eq(models.personPoliticalParty.id, existing[0].id))
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
            .insert(models.personPoliticalParty)
            .values({
                id: generateId(),
                idPerson: body.idPerson,
                idPoliticalParty: body.idPoliticalParty,
                startingAt: body.startingAt ?? null,
                endingAt: body.endingAt ?? null,
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
