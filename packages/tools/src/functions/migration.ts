import { sql } from "drizzle-orm"
import { dbClient } from "../utilities/dbClient"


async function migration() {
    try {
        // Enable pg_trgm extension for fuzzy text search (similarity function)
        console.log("Enabling pg_trgm extension...")
        await dbClient().execute(sql`CREATE EXTENSION IF NOT EXISTS pg_trgm;`)
        console.log("pg_trgm extension enabled.")

    } catch (error) {
        console.log(error)
    }
}

await migration()
process.exit()
