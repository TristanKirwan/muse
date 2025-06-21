import type { User } from "@/payload-types";
import { persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const userStore = createStore<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    { name: "user-storage" }
  )
);
