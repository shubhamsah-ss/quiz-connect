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

        let verificationToken

        if (identifier.toLowerCase() === "email") {
            const email = searchParams.get("email")

            if (!email) {
                return customResponse({
                    success: false,
                    error: { message: "Email is required!" },
                    status: 400
                })
            }

            verificationToken = await db.verificationToken.findFirst({
                where: { email }
            })

        } else if (identifier.toLowerCase() === "token") {
            const token = searchParams.get("token")

            if (!token) {
                return customResponse({
                    success: false,
                    error: { message: "Token is required!" },
                    status: 400
                })
            }
            verificationToken = await db.verificationToken.findFirst({
                where: { token }
            })

        } else {
            return customResponse({
                success: false,
                error: { message: "Invalid identifier!" },
                status: 400
            })
        }

        if(!verificationToken) {
            return customResponse({
                success: false,
                error: { message: "Verification token not found!" },
                status: 404
            })
        }

        return customResponse({
            success: true,
            message: "Verificaiton token found!",
            data: verificationToken,
            status: 200
        })

    } catch (error: any) {
        return customResponse({
            success: false,
            error: { message: "Internal server error!" },
            status: 500
        })
    }
}