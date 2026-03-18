import { index, pgTable, text } from "drizzle-orm/pg-core"
import { idColumn } from "../../components/models/idColumn.js"
import { timestampColumn } from "../../components/models/timestampColumn.js"


export const roleModel = pgTable(
    "table_role",
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
