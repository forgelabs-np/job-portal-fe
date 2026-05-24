import { create } from "zustand";

type RoleModalStore = {
  loginOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
};

export const useRoleModalStore = create<RoleModalStore>((set) => ({
  loginOpen: false,
  openLoginModal: () => set({ loginOpen: true }),
  closeLoginModal: () => set({ loginOpen: false }),
}));
