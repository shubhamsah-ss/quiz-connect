import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig)

import {
    DEFAULT_LOGIN_REDIRECT,
    adminRoutes,
    apiAuthPrefix,
    authRoutes,
    publicRoutes
} from "./routes";
import { cookies } from "next/headers";

export default auth((request) => {
    const { nextUrl } = request
    const isLoggedIn = !!request.auth
    const userRole = request.auth?.user?.role
    
    const cookiesStore = cookies()
    const tokenCookie = cookiesStore.get("adminAuth")

    const adminAuth = tokenCookie?.value

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)
    const isAdminRoute = adminRoutes.includes(nextUrl.pathname)

    // Handle API routes (bypassing authentication)
    if(isApiAuthRoute) {
        return; 
    }

    // Handle authentication routes
    if(isAuthRoute) {
        if(isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return;
    }

    // Handle public routes
    if (isPublicRoute) {
        return;
    }

    // Handle protected routes
    if(!isLoggedIn && !isPublicRoute){
        let callbackUrl = nextUrl.pathname
        if(nextUrl.search) {
            callbackUrl += nextUrl.search
        }

        const encodedCallbackUrl = encodeURIComponent(callbackUrl)

        const fullUrl = `/login?callbackUrl=${encodedCallbackUrl}`;

        return Response.redirect(new URL(fullUrl, nextUrl));
    }

    // Handle role-based access
    if(userRole === "ADMIN") {
        if(isAdminRoute) {
            if(!adminAuth) return Response.redirect(new URL( "/admin", nextUrl))
        }
    } else {
        if(isAdminRoute) {
            return Response.redirect(new URL( "/unauthorized", nextUrl))
        }
    }

    // Allow access to other routes
    return;

})

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'  ],
}