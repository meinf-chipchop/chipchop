import { create } from "zustand";

type UserRole = "Customer" | "Chef" | "Delivery";

interface StoreState {
  user: {
    role: UserRole;
  };
  setUserRole: (role: UserRole) => void;
}

export const useStore = create<StoreState>((set) => ({
  user: {
    role: "Customer",
  },
  setUserRole: (role: UserRole) => {
    set((state) => ({
      user: {
        ...state.user,
        role,
      },
    }));
  },
}));
