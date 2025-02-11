// Note: This basic auth middleware implementation allows authed clients 
//       to access signin/signup pages for testing purposes and ease of
//       switching accounts
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_ROUTES = [
    "/",
    "/signin",
    "/signup",
];

export default async function authMiddleware(request: NextRequest) {
    const currentPath = request.nextUrl.pathname;

    // Pass through requests to public or api routes
    if (PUBLIC_ROUTES.includes(currentPath) || currentPath.startsWith("/api")) {
        return NextResponse.next();
    }

    // Validate session token or redirect
    try {
        const sessionUrl = new URL("/api/auth/get-session", request.nextUrl.origin);

        const response = await fetch(sessionUrl.toString(), {
            headers: {
                cookie: request.headers.get("cookie") ?? "",
            },
        });

        if (!response.ok) {
            throw new Error(`Session API returned ${response.status}`);
        }

        const data = await response.json();

        if (!data?.session) {
            const signInUrl = new URL("/signin", request.url);
            signInUrl.searchParams.set("redirect", currentPath);
            return NextResponse.redirect(signInUrl);
        }

        return NextResponse.next();
    } catch (error: unknown) {
        console.error("[AUTHMIDDLEWARE] Error:\n", error);

        const signInUrl = new URL("/signin", request.url);
        signInUrl.searchParams.set("redirect", currentPath);
        return NextResponse.redirect(signInUrl);
    }
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"]
};
