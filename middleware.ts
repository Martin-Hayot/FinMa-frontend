import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// Define your protected routes configuration
const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/settings",
    "/link",
    // Add other protected routes
];

const adminRoutes = [
    "/admin",
    // Add admin-only routes
];

export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Check if this is a protected route
    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    const isAdminRoute = adminRoutes.some((route) =>
        pathname.startsWith(route)
    );

    // If it's not a protected route, don't do anything
    if (!isProtectedRoute && !isAdminRoute) {
        return NextResponse.next();
    }

    const token = req.cookies.get("access_token")?.value || "";

    // If the token is not present, redirect to login
    if (!token) {
        const loginUrl = `${req.nextUrl.origin}/login`;
        return NextResponse.redirect(loginUrl);
    }

    // Verify the token with your backend
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

        if (response.status !== 200) {
            const loginUrl = `${req.nextUrl.origin}/login`;
            return NextResponse.redirect(loginUrl);
        }
    } catch (error: unknown) {
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

        const loginUrl = `${req.nextUrl.origin}/login`;
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
