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

    // If the token is present, verify it
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        }
    );

    // If the token is invalid, redirect to login
    if (response.status !== 200) {
        const loginUrl = `${req.nextUrl.origin}/login`;
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
