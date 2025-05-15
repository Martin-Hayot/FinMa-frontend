import { create } from "zustand";
import { User } from "@/types";
import axios from "axios";

interface UserStore {
    user: User | null;
    currentUser: () => Promise<void>;
    setUser: (user: User) => void;
    clearUser: () => void;
    updateUser: (user: Partial<User>) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    currentUser: async () => {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
            {
                withCredentials: true,
            }
        );

        if (res.status === 200) {
            set({ user: res.data.user });
        } else {
            set({ user: null });
        }
    },
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
    updateUser: (user) =>
        set((state) => ({
            user: { ...state.user, ...user } as User,
        })),
}));
