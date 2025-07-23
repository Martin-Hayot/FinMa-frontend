import { create } from "zustand";

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
    updateUser: (user: Partial<User>) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
    updateUser: (user) =>
        set((state) => ({
            user: state.user ? { ...state.user, ...user } as User : null,
        })),
}));
