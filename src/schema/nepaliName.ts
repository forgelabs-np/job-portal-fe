import { nepaliNameRegex } from "@/constants/regex";
import * as Yup from "yup";


export const nepaliRequiredSchema = (validationName: string, max = 100) => {
  return Yup.string()
    .trim()
    .required(`${validationName} is required.`)
    .max(max, `${validationName} should not exceed ${max} characters.`)
    .matches(nepaliNameRegex, `${validationName} is not valid.`);
};

export const nepaliNotRequiredSchema = (validationName: string, max = 200) => {
  return Yup.string()
    .trim()
    .max(max, `${validationName} should not exceed ${max} characters.`)
    .matches(nepaliNameRegex, `${validationName} is not valid.`);
};