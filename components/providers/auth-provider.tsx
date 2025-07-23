"use client";

import { useUserStore } from "@/store/useUser";
import { createContext, useContext, ReactNode } from "react";
import { useCurrentUser } from "@/queries/user";

// Define the AuthContext type
type AuthContextType = {
    isLoading: boolean;
    isAuthenticated: boolean;
    checkPermission: (requiredRole: string) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const { user } = useUserStore();
    const { isLoading } = useCurrentUser();

    const checkPermission = (requiredRole: string) => {
        if (!user) return false;
        if (requiredRole === "admin") return user.role === "admin";
        return true; // For 'user' role
    };

    const value = {
        isLoading,
        isAuthenticated: !!user,
        checkPermission,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
