import { boolean, index, pgTable, text } from "drizzle-orm/pg-core"
import { idColumn } from "../../components/models/idColumn.js"
import { timestampColumn } from "../../components/models/timestampColumn.js"
import { personModel } from "./person.model.js"


export const factModel = pgTable(
    "table_fact",
    {
        id:
            idColumn("id")
                .primaryKey(),

        idPerson:
            idColumn("id_person")
                .references(() => personModel.id, { onDelete: "cascade", onUpdate: "cascade" })
                .notNull(),

        title:
            text("title")
                .notNull(),

        description:
            text("description")
                .notNull(),

        occurredAt:
            text("occurred_at"),

        category:
            text("category"),

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
        index().on(t.idPerson),
        index().on(t.title),
    ])
)
