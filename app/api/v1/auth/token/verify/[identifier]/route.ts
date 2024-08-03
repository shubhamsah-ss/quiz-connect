import customResponse from "@/lib/customResponse";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { identifier: string } }) {

    const { identifier } = params
    const searchParams = request.nextUrl.searchParams

    try {
        if (!identifier) {
            return customResponse({
                success: false,
                error: { message: "Identifier is required!" },
                status: 400
            })
        }

        if (identifier.toLowerCase() === "token") {
            const token = searchParams.get("token")

            const url = `${process.env.BASEURL}/api/v1/auth/token/token?token=${token}`

            const verificationTokenResponse = await fetch(url, {
                method: "GET"
            })

            const existingToken = await verificationTokenResponse.json()

            if (!existingToken.success) {
                return customResponse({
                    success: false,
                    error: { message: existingToken.error.message },
                    status: verificationTokenResponse.status
                })
            }

            const hasExpired = new Date(existingToken.expires) < new Date()

            if (hasExpired) {
                return customResponse({
                    success: false,
                    error: { message: "Token has expired!" },
                    status: 400
                })
            }

            const existingUserResponse = await fetch(`${process.env.BASEURL}/api/v1/users/email?email=${existingToken.data.email}`, {
                method: "GET"
            })

            const existingUser = await existingUserResponse.json()

            if (!existingUser.data) {
                return customResponse({
                    success: false,
                    error: { message: existingUser.error.message },
                    status: existingUserResponse.status
                })
            }

            await db.user.update({
                where: {
                    id: existingUser.data.id
                },
                data: {
                    emailVerified: new Date(),
                    email: existingToken.email
                }
            })

            await db.verificationToken.delete({
                where: { id: existingToken.data.id }
            })

            return customResponse({
                success: true,
                message: "Email verified!",
                status: 200
            })
        }


    } catch (error: any) {
        return customResponse({
            success: false,
            error: { message: "Internal server error!" },
            status: 500
        })
    }
}