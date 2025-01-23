import { routing } from "@/i18n/routing";
import { rIsAdmin } from "@/shared/api/auth";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

async function adminMiddleware(req: NextRequest) {
    const token = req.cookies.get("access");
    const { pathname } = req.nextUrl;
    if (!token) {
        if (pathname !== '/admin/login') {
            return NextResponse.redirect(new URL(`/admin/login`, req.url))
        } else {
            return NextResponse.next();
        }
    }
    const isAdmin = await rIsAdmin(token.value)
    if (!isAdmin && pathname == '/admin') {
        return NextResponse.redirect(new URL(`/admin/login`, req.url))
    }
    if (isAdmin && pathname == '/admin/login') {
        return NextResponse.redirect(new URL(`/admin`, req.url))
    }
    return NextResponse.next();
}

function authMiddleware(req: NextRequest) {
    // const token = req.cookies.get("access");
    // const { pathname } = req.nextUrl;
    //
    // console.log(pathname)
    //
    // if (pathname == `/profile` && !token) {
    //     return NextResponse.redirect(new URL(`/admin/login`, req.url))
    // }
    // if (pathname == `/admin/login` && token) {
    //     return NextResponse.redirect(new URL(`/admin`, req.url))
    // }
    //
    // return NextResponse.next();

}
export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (pathname.startsWith("/admin")) {
        return adminMiddleware(req);
    }

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
