// schema/agency.ts
import * as Yup from "yup";
import { stringRequiredSchema } from "./string";
import { emailRequiredSchema } from "./email";


export const agencyVerificationSchema = Yup.object({
    companyName: stringRequiredSchema("Company name"),

    companyDescription: stringRequiredSchema("Company description", 500),

    // Make sure to use stringNotRequiredSchema WITHOUT .required()
    companyWebsite: Yup.string()
        .trim()
        .transform((value) => (value === "" ? undefined : value))
        .url("Enter a valid website URL")
        .optional(),

    companyLogoUrl: Yup.string()
        .trim()
        .transform((value) => (value === "" ? undefined : value))
        .url("Enter a valid logo URL")
        .optional(),

    companyAddress: stringRequiredSchema("Company address", 200),

    companyPhone: stringRequiredSchema("Company phone", 20),

    registrationNumber: stringRequiredSchema("Registration number", 50),

    taxId: stringRequiredSchema("Tax ID", 50),

    contactPersonName: stringRequiredSchema("Contact person name"),

    contactPersonEmail: emailRequiredSchema("Contact person email"),

    contactPersonPhone: stringRequiredSchema("Contact person phone", 20),
});