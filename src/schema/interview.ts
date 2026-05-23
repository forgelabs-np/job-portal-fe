// schema/interview.ts
import * as yup from "yup";
import { stringNotRequiredSchema, stringRequiredSchema } from "./string";

export const scheduleInterviewSchema = yup.object({
    candidateIds: yup
        .array()
        .of(yup.number().required())
        .required()
        .default([]),
    mode: yup
        .mixed<"ONLINE" | "IN_PERSON">()
        .oneOf(["ONLINE", "IN_PERSON"])
        .required(),
    date: stringRequiredSchema("Date"),
    time: stringRequiredSchema("Time"),
    locationOrUrl: stringRequiredSchema("Location or URL"),
    notes: yup.string().default(""),
    timezone: stringRequiredSchema("Timezone"),
});