import customResponse from "@/lib/customResponse";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { identifier: string } }) {
    const { identifier } = params
    const searchParams = request.nextUrl.searchParams;
    try {

        if (!identifier) {
            return customResponse({
                success: false,
                error: { message: "Identifier is required!" },
                status: 400
            })
        }

        let user

        if (identifier.toLowerCase() === "email") {
            const email = searchParams.get("email")

            if (!email) {
                return customResponse({
                    success: false,
                    error: { message: "Email is required!" },
                    status: 400
                })
            }

            user = await db.user.findFirst({
                where: { email }
            })

        } else if (identifier.toLowerCase() === "id") {
            const id = searchParams.get("id")

            if (!id) {
                return customResponse({
                    success: false,
                    error: { message: "Id is required!" },
                    status: 400
                })
            }

            user = await db.user.findUnique({
                where: { id }
            })

        } else {
            return customResponse({
                success: false,
                error: { message: "Invalid identifier!" },
                status: 400
            })
        }

        if (!user) {
            return customResponse({
                success: false,
                error: { message: "User not found!" },
                status: 404
            })
        }

        return customResponse({
            success: true,
            message: "User found!",
            data: user,
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