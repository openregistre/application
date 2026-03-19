import { index, pgTable } from "drizzle-orm/pg-core"
import { idColumn } from "../../components/models/idColumn.js"
import { timestampColumn } from "../../components/models/timestampColumn.js"
import { factModel } from "./fact.model.js"
import { tagModel } from "./tag.model.js"


export const factTagModel = pgTable(
    "table_fact_tag",
    {
        id:
            idColumn("id")
                .primaryKey(),

        idFact:
            idColumn("id_fact")
                .references(() => factModel.id, { onDelete: "cascade", onUpdate: "cascade" })
                .notNull(),

        idTag:
            idColumn("id_tag")
                .references(() => tagModel.id, { onDelete: "cascade", onUpdate: "cascade" })
                .notNull(),

        lastUpdatedAt:
            timestampColumn("last_updated_at"),

        createdAt:
            timestampColumn("created_at")
                .notNull(),

    },
    (t) => ([
        index().on(t.idFact),
        index().on(t.idTag),
    ])
)
