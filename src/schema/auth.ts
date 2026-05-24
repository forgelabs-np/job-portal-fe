import * as Yup from "yup";
import { emailRequiredSchema } from "@/schema/email";
import { nameRequiredSchema } from "@/schema/name";
import { stringRequiredSchema } from "@/schema/string";

export const passwordSchema = (validationName = "Password") =>
  stringRequiredSchema(validationName, 128)
    .min(8, `${validationName} should be at least 8 characters.`)
    .matches(/(?=.*[A-Z])/, `${validationName} must contain at least one uppercase letter.`)
    .matches(/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?])/, `${validationName} must contain at least one special character.`);


    export const loginPasswordSchema = (validationName = "Password") =>
  stringRequiredSchema(validationName, 128)
export const loginSchema = Yup.object({
  email: emailRequiredSchema("Email"),
  password: loginPasswordSchema(),
});

export const signupSchema = Yup.object({
  fullName: nameRequiredSchema("Full Name"),
  email: emailRequiredSchema("Email"),
  password: passwordSchema(),
  confirmPassword: Yup.string()
    .required("Confirm Password is required.")
    .oneOf([Yup.ref("password")], "Confirm Password must match Password."),
});

export const changePasswordSchema = Yup.object({
  currentPassword: stringRequiredSchema("Current Password", 128),
  newPassword: passwordSchema("New Password"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required.")
    .oneOf([Yup.ref("newPassword")], "Confirm Password must match New Password."),
});

export const resetPasswordSchema = Yup.object({
  token: stringRequiredSchema("OTP"),

  newPassword: passwordSchema("New Password"),

  confirmPassword: Yup.string()
    .required("Confirm Password is required.")
    .oneOf(
      [Yup.ref("newPassword")],
      "Confirm Password must match New Password."
    ),
});
