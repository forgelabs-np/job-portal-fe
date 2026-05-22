import * as Yup from "yup";

interface ISelectOption {
  label: string;
  value: string | number;
}

export const objectRequiredSchema = (
  validationName: string,
): Yup.MixedSchema<ISelectOption | string, Yup.AnyObject, undefined, ""> => {
  const schema = Yup.mixed<ISelectOption | string>()
    .required(`${validationName} is required.`)
    .test("is-selected", `${validationName} is required.`, (value) => {
      if (!value) return false;
      if (typeof value === "string") return value.trim() !== "";
      if (typeof value === "object") return !!value;
      return false;
    });
  return schema;
};