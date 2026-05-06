import { create } from "zustand";
import TokenService, { MofinTokenDetails } from "@/utils/token";

export type OtpEmailStore = {
  otpEmail: string;
  setOtpEmail: (email: string) => void;
};

export const useOtpEmailStore = create<OtpEmailStore>((set) => ({
  otpEmail: "",
  setOtpEmail: (email) => set(() => ({ otpEmail: email })),
}));

export type AuthStore = {
  user: MofinTokenDetails | null;
  isAuthenticated: boolean;
  role: string | null;
  setUser: (user: MofinTokenDetails | null) => void;
  logout: () => void;
  initializeAuth: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  role: null,
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      role: user?.workspace ?? null,
    }),
  logout: () => {
    TokenService.clearToken();
    set({ user: null, isAuthenticated: false, role: null });
  },
  initializeAuth: () => {
    const user = TokenService.getTokenDetails();
    if (user && TokenService.isAuthenticated()) {
      set({
        user,
        isAuthenticated: true,
        role: user.workspace,
      });
    } else {
      set({ user: null, isAuthenticated: false, role: null });
    }
  },
}));
