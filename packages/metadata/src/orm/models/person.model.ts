import { boolean, index, pgTable, text } from "drizzle-orm/pg-core"
import { idColumn } from "../../components/models/idColumn.js"
import { stringArrayColumn } from "../../components/models/stringArrayColumn.js"
import { timestampColumn } from "../../components/models/timestampColumn.js"


export const personModel = pgTable(
    "table_person",
    {
        id:
            idColumn("id")
                .primaryKey(),

        fullName:
            text("full_name")
                .notNull(),

        birthDate:
            text("birth_date"),

        photoUrl:
            text("photo_url"),

        links:
            stringArrayColumn("links"),

        isFlagged:
            boolean("is_flagged")
                .notNull()
                .default(false),

        lastUpdatedAt:
            timestampColumn("last_updated_at"),

        createdAt:
            timestampColumn("created_at")
                .notNull(),

    },
    (t) => ([
        index().on(t.fullName),
    ])
)
