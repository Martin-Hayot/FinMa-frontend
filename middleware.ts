import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// Define your protected routes configuration with role requirements
const routeConfig = {
    "/dashboard": { requiredRole: "user" },
    "/profile": { requiredRole: "user" },
    "/settings": { requiredRole: "user" },
    "/link": { requiredRole: "user" },
    "/admin": { requiredRole: "admin" },
    // Add other routes with their required roles
};

// Simple cache implementation
interface CacheEntry {
    role: string;
    expiry: number; // Timestamp when this entry expires
}

// Cache object - stored in memory
const tokenCache: Record<string, CacheEntry> = {};

// Cache TTL in seconds (1 minute)
const CACHE_TTL = 60;

export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Find matching route configuration
    const matchingRoute = Object.keys(routeConfig).find((route) =>
        pathname.startsWith(route)
    ) as keyof typeof routeConfig | undefined;

    // If no matching route config, proceed normally
    if (!matchingRoute) {
        return NextResponse.next();
    }

    const token = req.cookies.get("access_token")?.value || "";

    // If the token is not present, redirect to login
    if (!token) {
        return NextResponse.redirect(
            `${req.nextUrl.origin}/login?redirect=${encodeURIComponent(
                pathname
            )}`
        );
    }

    // Check if we have a valid cached role for this token
    const now = Math.floor(Date.now() / 1000);
    const cachedEntry = tokenCache[token];

    if (cachedEntry && cachedEntry.expiry > now) {
        // Cache hit - use the cached role
        const userRole = cachedEntry.role;
        const { requiredRole } = routeConfig[matchingRoute];

        if (requiredRole === "admin" && userRole !== "admin") {
            return NextResponse.redirect(`${req.nextUrl.origin}/access-denied`);
        }

        return NextResponse.next();
    }

    // Cache miss or expired - verify the token with your backend
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/me`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            }
        );

        // Store result in cache
        const userRole = response.data.role || "user";
        tokenCache[token] = {
            role: userRole,
            expiry: now + CACHE_TTL,
        };

        // Ensure user has required role for this route
        const { requiredRole } = routeConfig[matchingRoute];

        if (requiredRole === "admin" && userRole !== "admin") {
            // Redirect unauthorized users to an access denied page
            return NextResponse.redirect(`${req.nextUrl.origin}/access-denied`);
        }

        return NextResponse.next();
    } catch (error) {
        // Type guard to check if error is an AxiosError
        if (axios.isAxiosError(error)) {
            console.error("Error verifying token:", error.message);

            // Log the error details
            if (error.response) {
                // The server responded with a status code outside the 2xx range
                console.error("Error status:", error.response.status);
                console.error(
                    "Error data:",
                    JSON.stringify(error.response.data, null, 2)
                );
                console.error(
                    "Error headers:",
                    JSON.stringify(error.response.headers, null, 2)
                );
            } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received:", error.request);
            } else {
                // Something happened in setting up the request
                console.error("Error message:", error.message);
            }
        } else {
            console.error("Unknown error:", error);
        }

        return NextResponse.redirect(
            `${req.nextUrl.origin}/login?redirect=${encodeURIComponent(
                pathname
            )}`
        );
    }
}

// Routes Middleware should not run on
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
