/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
*/
export const publicRoutes:string[] = [
    "/",
    "/questions",
    "/new-verification"
]

/**
 * An array of routes that are accessible only by admin users
 * @type {string[]}
*/
export const adminRoutes: string[] = [
    "/admin/dashboard",
    "/admin/settings",
    "/admin/users",
    "/admin/categories",
    "/admin/subjects",
    "/admin/topics",
    "/admin/questions"
];


/**
 * An array of routes that are used for authenticaiton
 * These routes will redirect logged in users to /settings
 * @type {string[]}
*/
export const authRoutes:string[] = [
    "/login",
    "/register",
    "/error"
]

/**
 * The prefix for API authenticaiton routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
*/
export const apiAuthPrefix: string = "/api/"


/**
 * The default redirect path after logging in
 * @type {string}
*/
export const DEFAULT_LOGIN_REDIRECT: string = "/dashboard"