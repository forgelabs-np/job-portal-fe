import { create } from "zustand";
import { useCurrentUserStore } from "@/store/currentUserStore";
import TokenService, { MofinTokenDetails } from "@/utils/token";

export { useCurrentUserStore } from "@/store/currentUserStore";

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
  authReady: boolean;
  setUser: (user: MofinTokenDetails | null) => void;
  logout: () => void;
  initializeAuth: () => void;
};

const initialTokenUser = TokenService.getTokenDetails();
const initialAuthState =
  initialTokenUser && TokenService.isAuthenticated()
    ? {
        user: initialTokenUser,
        isAuthenticated: true,
        role: initialTokenUser.roles?.[0] ?? null,
        authReady: true,
      }
    : {
        user: null,
        isAuthenticated: false,
        role: null,
        authReady: true,
      };

export const useAuthStore = create<AuthStore>((set) => ({
  user: initialAuthState.user,
  isAuthenticated: initialAuthState.isAuthenticated,
  role: initialAuthState.role,
  authReady: initialAuthState.authReady,
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      role: user?.roles?.[0] ?? null,
      authReady: true,
    }),
  logout: () => {
    TokenService.clearToken();
    useCurrentUserStore.getState().clearProfile();
    set({
      user: null,
      isAuthenticated: false,
      role: null,
      authReady: true,
    });
  },
  initializeAuth: () => {
    const user = TokenService.getTokenDetails();
    console.log(user, "user");
    if (user && TokenService.isAuthenticated()) {
      set({
        user,
        isAuthenticated: true,
        role: user.roles?.[0] ?? null,
        authReady: true,
      });
    } else {
      set({
        user: null,
        isAuthenticated: false,
        role: null,
        authReady: true,
      });
    }
  },
}));
