import * as v from "valibot"


export const stringArraySchema = v.pipe(
    v.array(v.string()),
)
