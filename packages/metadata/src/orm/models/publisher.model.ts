import { index, pgTable, text } from "drizzle-orm/pg-core"
import { idColumn } from "../../components/models/idColumn"
import { timestampColumn } from "../../components/models/timestampColumn"


export const publisherModel = pgTable(
    "table_publisher",
    {
        id:
            idColumn("id")
                .primaryKey(),

        name:
            text("name")
                .notNull()
                .unique(),

        websiteUrl:
            text("website_url"),

        logoUrl:
            text("logo_url"),

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
