"use client";

import { useUserStore } from "@/store/useUser";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Define the AuthContext type
type AuthContextType = {
    isLoading: boolean;
    isAuthenticated: boolean;
    checkPermission: (requiredRole: string) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const { user, currentUser } = useUserStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await currentUser();
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [currentUser]);

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
