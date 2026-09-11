import * as Yup from "yup";
import { stringRequiredSchema } from "./string";
import { emailRequiredSchema } from "./email";
import { phoneNumberSchema } from "./phoneNumber";

export const leadFormSchema = Yup.object({
  fullName: stringRequiredSchema("Full Name", 100),
  phoneNumber: phoneNumberSchema("Phone Number"),
  email: emailRequiredSchema("Email"),
  location: stringRequiredSchema("Location", 200),
  subject: stringRequiredSchema("Subject"),
  description: Yup.string()
    .trim()
    .required("Description is required.")
    .min(10, "Description should be at least 10 characters.")
    .max(2000, "Description should not exceed 2000 characters."),
});

export type LeadFormValues = Yup.InferType<typeof leadFormSchema>;

export const leadFormDefaultValues: LeadFormValues = {
  fullName: "",
  phoneNumber: "",
  email: "",
  location: "",
  subject: "",
  description: "",
};
