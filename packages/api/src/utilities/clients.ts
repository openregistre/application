import { modelSchemas } from '@openregistre/metadata/orm'
import { postgresqlClient } from "../clients/postgresql.client.js"
import { Environment } from "./environment.js"


type PlatformPostgresqlClient = ReturnType<typeof postgresqlClient<typeof modelSchemas>>

export class Clients {
    static platformPostgresql: PlatformPostgresqlClient

    static async init() {
        this.platformPostgresql = postgresqlClient({
            url: Environment.SQL_DATABASE_URL,
            schema: modelSchemas,
        })
    }
}