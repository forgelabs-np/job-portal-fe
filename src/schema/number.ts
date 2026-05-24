import * as Yup from "yup";

import { stringRequiredSchema } from "./string";

export const numberRequiredSchema = (
  validationName: string,
  supportsDecimal: boolean = true
): Yup.StringSchema<string, Yup.AnyObject, undefined, ""> => {
  const schema = stringRequiredSchema(validationName).test(
    "is-valid-number",
    `${validationName} is not valid number`,
    function (value) {
      const convertedValue = Number(value);

      if (convertedValue !== convertedValue) return false;

      if (!supportsDecimal && value.includes(".")) return false;

      return true;
    }
  );
  return schema;
};

export const numberNotRequiredSchema = (
  validationName: string,
  supportsDecimal: boolean = true
): Yup.StringSchema<string | undefined, Yup.AnyObject, undefined, ""> => {
  const schema = Yup.string()
    .trim()
    .test(
      "is-valid-number",
      `${validationName} is not valid number`,
      function (value) {
        if (!value) return true; // when there is no value return true

        const convertedValue = Number(value);

        if (convertedValue !== convertedValue) return false;

        if (!supportsDecimal && value?.includes(".")) return false;

        return true;
      }
    );
  return schema;
};