import { LoginDialogProps } from "./login";

export type RegisterDialogProps = LoginDialogProps;

export type EmailVerificationProps = {
  setActiveStep: (step: number) => void;
};

export type RegisterFormProps = EmailVerificationProps;

export type SetPasswordProps = EmailVerificationProps;
