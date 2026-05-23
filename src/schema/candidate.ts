import * as Yup from "yup";
import { stringNotRequiredSchema, stringRequiredSchema } from "@/schema/string";

const futureDateError = "Date cannot be in the future.";
const invalidDateError = "Date is not valid.";

const dateNotInFuture = (fieldName: string) =>
  Yup.string()
    .trim()
    .required(`${fieldName} is required.`)
    .test("is-date", invalidDateError, (value) => {
      if (!value) return false;
      return !Number.isNaN(Date.parse(value));
    })
    .test("not-in-future", futureDateError, (value) => {
      if (!value) return false;
      const dateValue = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return dateValue <= today;
    });

export const candidateVerificationSchema = Yup.object({
  firstName: stringRequiredSchema("First Name"),
  lastName: stringRequiredSchema("Last Name"),
  trade: stringNotRequiredSchema(),
  dateOfBirth: dateNotInFuture("Date of Birth"),
  maritalStatus: stringRequiredSchema("Marital Status"),
  passportNumber: stringRequiredSchema("Passport Number"),
  passportIssueDate: dateNotInFuture("Passport Issue Date"),
  passportExpiryDate: Yup.string()
    .trim()
    .required("Passport Expiry Date is required.")
    .test("is-date", invalidDateError, (value) => {
      if (!value) return false;
      return !Number.isNaN(Date.parse(value));
    })
    .test("expiry-after-issue", "Passport Expiry Date must be after Passport Issue Date.", function (value) {
      const issueDate = this.parent.passportIssueDate;
      if (!value || !issueDate) return true;
      const expiryDate = new Date(value);
      const issue = new Date(issueDate);
      return expiryDate > issue;
    }),
  documentsFolderLink: Yup.string()
    .trim()
    .notRequired()
    .test(
      "is-valid-url",
      "Documents Folder Link must be a valid URL.",
      (value) => {
        if (!value) return true;
        return Yup.string().url().isValidSync(value);
      },
    ),
  introVideoLink: Yup.string()
    .trim()
    .required("Intro Video Link is required.")
    .url("Intro Video Link must be a valid URL."),
});

export default candidateVerificationSchema;
