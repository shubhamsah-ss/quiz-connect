import customResponse from "@/lib/customResponse";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { v4 as uuid } from "uuid";

export async function POST(request: NextRequest) {
    const token = uuid()
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    try {
        const { email }: { email: string } = await request.json()

        const url = `${process.env.BASEURL}/api/v1/auth/token/email?email=${email}`

        const response = await fetch(url, {
            method: "GET",
        })

        const tokenResponse  = await response.json()
        const existingToken = tokenResponse.data

        

        if(existingToken) {
            await db.verificationToken.delete({
                where: {
                    id: existingToken.id
                }
            })
        }

        const verificationToken = await db.verificationToken.create({
            data: {
                email,
                token,
                expires
            }
        })

        return customResponse({
            success: true,
            message: "New verification token generated!",
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