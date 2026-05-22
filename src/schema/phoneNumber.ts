import * as Yup from "yup";
import { stringRequiredSchema } from "./string";

export const phoneNumberSchema = (
  validationName?: string
): Yup.StringSchema<string, Yup.AnyObject, undefined, ""> => {
  validationName = validationName ?? "Phone Number";

  const schema = stringRequiredSchema(validationName)
    .test(
      "is-valid-phone-number",
      `${validationName} is not valid`,
      (value) => {
        // should be number
        if (+value !== +value) return false;

        // should not contain negative sign (-)
        if (value.includes("-")) return false;

        // should start from either 98 or 97
        if (!value.startsWith("98") && !value.startsWith("97")) return false;

        return true;
      }
    )
    .test(
      "is-valid-length",
      `${validationName} should be 10 characters`,
      (value) => value.length === 10
    );
  return schema;
};

export const officeNumberSchema = (
  validationName?: string,
): Yup.StringSchema<string, Yup.AnyObject, undefined, ""> => {
  validationName = validationName ?? "Office Number";

  const schema = stringRequiredSchema(validationName)
    .test(
      "is-valid-office-number",
      `${validationName} is not valid`,
      (value) => {
        // should be number
        if (+value !== +value) return false;

        // should not contain negative sign (-)
        if (value.includes("-")) return false;

        return true;
      },
    )
    .min(6, `${validationName} should be at least 6 digits.`)
    .max(10, `${validationName} should not exceed least 10 digits.`);

  return schema;
};