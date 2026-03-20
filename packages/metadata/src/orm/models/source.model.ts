import { index, pgTable, text } from "drizzle-orm/pg-core"
import { idColumn } from "../../components/models/idColumn.js"
import { timestampColumn } from "../../components/models/timestampColumn.js"
import { factModel } from "./fact.model.js"
import { publisherModel } from "./publisher.model.js"


export const sourceModel = pgTable(
    "table_source",
    {
        id:
            idColumn("id")
                .primaryKey(),

        idFact:
            idColumn("id_fact")
                .references(() => factModel.id, { onDelete: "cascade", onUpdate: "cascade" })
                .notNull(),

        idPublisher:
            idColumn("id_publisher")
                .references(() => publisherModel.id, { onDelete: "cascade", onUpdate: "cascade" })
                .notNull(),

        url:
            text("url")
                .notNull()
                .unique(),

        title:
            text("title")
                .notNull(),

        publishedAt:
            text("published_at"),

        lastUpdatedAt:
            timestampColumn("last_updated_at"),

        createdAt:
            timestampColumn("created_at")
                .notNull(),

    },
    (t) => ([
        index().on(t.idFact),
        index().on(t.idPublisher),
        index().on(t.url),
    ])
)
