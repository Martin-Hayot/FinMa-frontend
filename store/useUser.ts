import { create } from "zustand";
import axios from "axios";

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role?: string;
    avatar?: string;
}

interface UserStore {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
    currentUser: () => Promise<void>;
    updateUser: (user: Partial<User>) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
    currentUser: async () => {
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/me`,
                {
                    withCredentials: true,
                }
            );

            if (res.status === 200) {
                set({ user: res.data });
            }
        } catch (error) {
            console.error("Error fetching current user:", error);
            set({ user: null });
        }
    },
    updateUser: (user) =>
        set((state) => ({
            user: state.user ? { ...state.user, ...user } as User : null,
        })),
}));
