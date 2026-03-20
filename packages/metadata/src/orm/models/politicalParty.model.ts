import { index, pgTable, text } from "drizzle-orm/pg-core"
import { idColumn } from "../../components/models/idColumn.js"
import { timestampColumn } from "../../components/models/timestampColumn.js"


export const politicalPartyModel = pgTable(
    "table_political_party",
    {
        id:
            idColumn("id")
                .primaryKey(),

        name:
            text("name")
                .notNull()
                .unique(),

        abbreviation:
            text("abbreviation"),

        logoUrl:
            text("logo_url"),

        color:
            text("color"),

        lastUpdatedAt:
            timestampColumn("last_updated_at"),

        createdAt:
            timestampColumn("created_at")
                .notNull(),

    },
    (t) => ([
        index().on(t.name),
    ])
)
