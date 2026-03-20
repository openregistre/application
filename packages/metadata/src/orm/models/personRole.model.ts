import { index, pgTable, text } from "drizzle-orm/pg-core"
import { idColumn } from "../../components/models/idColumn.js"
import { timestampColumn } from "../../components/models/timestampColumn.js"
import { personModel } from "./person.model.js"
import { roleModel } from "./role.model.js"


export const personRoleModel = pgTable(
    "table_person_role",
    {
        id:
            idColumn("id")
                .primaryKey(),

        idPerson:
            idColumn("id_person")
                .references(() => personModel.id, { onDelete: "cascade", onUpdate: "cascade" })
                .notNull(),

        idRole:
            idColumn("id_role")
                .references(() => roleModel.id, { onDelete: "cascade", onUpdate: "cascade" })
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
        index().on(t.idRole),
    ])
)
