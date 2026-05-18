"use client";

import { FormProviderProps } from "@/shared/types";
import {
  FieldValues,
  FormProvider as ReactHookFormProvider,
} from "react-hook-form";

export const FormProvider = <TFieldValues extends FieldValues>({
  children,
  methods,
  onSubmit,
  style,
}: FormProviderProps<TFieldValues>) => {
  return (
    <ReactHookFormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} style={style}>{children}</form>
    </ReactHookFormProvider>
  );
};
