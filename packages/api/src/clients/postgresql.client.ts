import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from "postgres"
import { Exception } from "../utilities/exception.js"


export function postgresqlClient<TSchema extends Record<string, unknown>>(parameters: {
    url: string
    schema: TSchema
}) {
    try {
        const queryClient = postgres(parameters.url)
        const drizzleClient = drizzle(
            queryClient,
            {
                schema: parameters.schema
            }
        )
        return drizzleClient
    }
    catch (error) {
        throw new Exception({
            internalMessage: "PostgreSQL client not available",
            rawError: error,
        })
    }
}