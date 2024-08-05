export type UserType = {
    id?: string,
    name: string,
    email: string,
    image: string,
    emailVerified: string,
    isOAuth?: boolean
    role?: "ADMIN" | "USER"
}