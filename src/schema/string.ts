import * as Yup from "yup";

export const stringRequiredSchema = (
  validationName: string,
  max = 100,
): Yup.StringSchema<string, Yup.AnyObject, undefined, ""> => {
  const schema = Yup.string()
    .trim()
    .required(`${validationName} is required.`)
    .max(max, `${validationName} should not exceed ${max} characters.`);
  return schema;
};

export const stringNotRequiredSchema = () => {
  return Yup.string().trim().optional();
};