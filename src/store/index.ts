import { create } from "zustand";

export type OtpEmailStore = {
  otpEmail: string;
  setOtpEmail: (email: string) => void;
};

export const useOtpEmailStore = create<OtpEmailStore>((set) => ({
  otpEmail: "",
  setOtpEmail: (email) => set(() => ({ otpEmail: email })),
}));
