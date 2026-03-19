import { index, pgTable, text } from "drizzle-orm/pg-core"
import { idColumn } from "../../components/models/idColumn.js"
import { timestampColumn } from "../../components/models/timestampColumn.js"


export const tagModel = pgTable(
    "table_tag",
    {
        id:
            idColumn("id")
                .primaryKey(),

        label:
            text("label")
                .notNull()
                .unique(),

        lastUpdatedAt:
            timestampColumn("last_updated_at"),

        createdAt:
            timestampColumn("created_at")
                .notNull(),

    },
    (t) => ([
        index().on(t.label),
    ])
)
