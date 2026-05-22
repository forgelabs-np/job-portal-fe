import { emailRegex } from "@/constants/regex";
import * as Yup from "yup";


export const emailRequiredSchema = (
  validationName: string,
  max: number = 100
): Yup.StringSchema<string, Yup.AnyObject, undefined, ""> => {
  const schema = Yup.string()
    .trim()
    .max(max, `${validationName} should not exceed ${max} characters.`)
    .required(`${validationName} is required.`)
    .matches(emailRegex, `${validationName} is not valid.`);
  return schema;
};

export const emailNotRequiredSchema = (
  validationName: string,
  max: number = 100
): Yup.StringSchema<string | undefined, Yup.AnyObject, undefined, ""> => {
  const schema = Yup.string()
    .trim()
    .max(max, `${validationName} should not exceed ${max} characters.`)
    .test(
      "is-email-valid",
      `${validationName} is not valid.`,
      function (value) {
        if (!value?.trim()) return true;

        return emailRegex.test(value);
      }
    );
  return schema;
};