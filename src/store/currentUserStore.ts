import { create } from "zustand";
import type { CurrentUser } from "@/shared/types/auth/currentUser";

export type CurrentUserStore = {
  profile: CurrentUser | null;
  isProfileLoading: boolean;
  setProfile: (profile: CurrentUser | null) => void;
  setProfileLoading: (loading: boolean) => void;
  clearProfile: () => void;
};

export const useCurrentUserStore = create<CurrentUserStore>((set) => ({
  profile: null,
  isProfileLoading: false,
  setProfile: (profile) => set({ profile }),
  setProfileLoading: (isProfileLoading) => set({ isProfileLoading }),
  clearProfile: () => set({ profile: null, isProfileLoading: false }),
}));
