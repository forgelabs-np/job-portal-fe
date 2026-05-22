import { alphabetRegex } from "@/constants/regex";
import * as Yup from "yup";


export const nameRequiredSchema = (
  validationName: string,
  max: number = 100
) => {
  const schema = Yup.string()
    .trim()
    .required(`${validationName} is required.`)
    .max(max, `${validationName} should not exceed ${max} characters.`)
    .matches(alphabetRegex, `${validationName} is not valid.`);
  return schema;
};

export const nameNotRequiredSchema = (
  validationName: string,
  max: number = 100
) => {
  const schema = Yup.string()
    .trim()
    .test("is-valid-name", `${validationName} is not valid.`, (name) => {
      if (!name) {
        return true;
      }

      return alphabetRegex.test(name);
    })
    .max(max, `${validationName} should not exceed ${max} characters.`);
  return schema;
};