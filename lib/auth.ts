import { cookies } from "next/headers";
import axios from "axios";
import { User } from "@/types";

/**
 * Server-side function to get the current user
 * Can be used in Server Components or Server Actions
 */
export async function currentUser(): Promise<User | null> {
    // Get cookie from server context
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
        return null;
    }

    try {
        // Verify token with your backend
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/me`,
            {},
            {
                withCredentials: true,
            }
        );

        if (response.status === 200) {
            return response.data.user;
        }

        return null;
    } catch (error) {
        console.error("Error getting user:", error);
        return null;
    }
}

/**
 * Check if user has a specific role
 */
export function hasRole(user: User | null, role: string): boolean {
    if (!user) return false;
    return user.role === role;
}

/**
 * Check if user is admin
 */
export function isAdmin(user: User | null): boolean {
    return hasRole(user, "admin");
}
