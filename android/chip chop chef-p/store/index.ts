import { create } from "zustand";

type UserRole = "U" | "C" | "D";  // Match RoleEnum values

interface StoreState {
  userRole: UserRole | null;
  setUserRole: (role: UserRole) => void;
}

export const useStore = create<StoreState>((set) => ({
  userRole: null,
  setUserRole: (role: UserRole) => {
    set(() => ({ userRole: role }));
  },
}));
