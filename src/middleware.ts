import { routing } from "@/i18n/routing";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

// Locale middleware setup
const intlMiddleware = createMiddleware(routing);

// Authentication and redirection middleware
function authMiddleware(req: NextRequest) {
    const token = req.cookies.get("token");
    const { pathname } = req.nextUrl;
    if (pathname == `/admin` && !token) {
        return NextResponse.redirect(new URL(`/admin/login`, req.url))
    }
    if (pathname == `/admin/login` && token) {
        return NextResponse.redirect(new URL(`/admin`, req.url))
    }

    // If no redirect is needed, allow the request to proceed
    return NextResponse.next();
}

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Skip the locale middleware for admin routes
    if (pathname.startsWith("/admin") || pathname.startsWith("/admin/login")) {
        return authMiddleware(req);
    }

    // For all other routes, apply the intlMiddleware
    return intlMiddleware(req);
}

export const config = {
    matcher: [
        "/",
        "/admin",
        "/admin/login",
        "/(ru|kz)", // Locales
        "/(ru|kz)/:path*", // All paths under a locale
    ],
};
