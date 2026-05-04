import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";
import { TestContext } from "yup";

export type FormProviderProps<TFieldValues extends FieldValues> = {
  children: React.ReactNode;
  methods: UseFormReturn<TFieldValues, TestContext>;
  onSubmit: SubmitHandler<TFieldValues>;
};

export type FormLabelProps = {
  label?: string;
  required?: boolean;
  disabled?: boolean;
};
