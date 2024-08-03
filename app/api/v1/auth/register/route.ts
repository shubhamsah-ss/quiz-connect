import customResponse from "@/lib/customResponse";
import { db } from "@/lib/db";
import { signUpSchema } from "@/schema/formSchemas";
import { hash } from "bcryptjs";
import { NextRequest } from "next/server";
import * as z from "zod";
import { sendVerificationEmail } from "@/lib/sendVerificationEmail";

export async function POST(request: NextRequest) {
    try {
        const payload = await request.json()
        const values: z.infer<typeof signUpSchema> = payload.values
        const validatedFields = signUpSchema.safeParse(values)

        if (!validatedFields.success) {
            return customResponse({
                success: false,
                error: { message: "Invalid fields!" },
                status: 400
            })
        }

        const { email, password, name } = validatedFields.data

        const existingUser = await db.user.findFirst({
            where: { email }
        })

        if (existingUser) {
            return customResponse({
                success: false,
                error: { message: "User already exist!" },
                status: 409
            })
        }

        const hashedPassword = await hash(password, 10)

        const user = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })

        const url = `${process.env.BASEURL}/api/v1/auth/token/generate`

        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({ email }),
        })

        const verificationTokenResponse = await response.json()
        const verificationToken = verificationTokenResponse.data

        // SEND VERIFICATION EMAIL
        const emailResponse = await sendVerificationEmail({
            email,
            name,
            token: verificationToken.token,
        });

        const emailResponseData = await emailResponse.json()

        if (!emailResponseData.success) {
            return customResponse({
                success: false,
                error: { message: emailResponseData.error.message },
                status: 500
            })
        }

        return customResponse({
            success: true,
            message: "User registered successful! Please verify your account through registered email",
            data: {
                verificationToken,
                user
            },
            status: 201
        })
    } catch (error: any) {
        return customResponse({
            success: false,
            error: { message: "Internal server error!" },
            status: 500
        })
    }
}