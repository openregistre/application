import { index, pgTable, text } from "drizzle-orm/pg-core"
import { idColumn } from "../../components/models/idColumn.js"
import { timestampColumn } from "../../components/models/timestampColumn.js"
import { personModel } from "./person.model.js"
import { politicalPartyModel } from "./politicalParty.model.js"


export const personPoliticalPartyModel = pgTable(
    "table_person_political_party",
    {
        id:
            idColumn("id")
                .primaryKey(),

        idPerson:
            idColumn("id_person")
                .references(() => personModel.id, { onDelete: "cascade", onUpdate: "cascade" })
                .notNull(),

        idPoliticalParty:
            idColumn("id_political_party")
                .references(() => politicalPartyModel.id, { onDelete: "cascade", onUpdate: "cascade" })
                .notNull(),

        startingAt:
            text("starting_at"),

        endingAt:
            text("ending_at"),

        lastUpdatedAt:
            timestampColumn("last_updated_at"),

        createdAt:
            timestampColumn("created_at")
                .notNull(),

    },
    (t) => ([
        index().on(t.idPerson),
        index().on(t.idPoliticalParty),
    ])
)
