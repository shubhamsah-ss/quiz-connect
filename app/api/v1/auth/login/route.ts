import { signIn } from "@/auth";
import customResponse from "@/lib/customResponse";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/sendVerificationEmail";
import { signInSchema } from "@/schema/formSchemas";
import { compare } from "bcryptjs";
import { NextRequest } from "next/server";
import * as z from "zod";

export async function POST(request: NextRequest) {
    try {
        const payload = await request.json()
        const values: z.infer<typeof signInSchema> = payload.values
        const validatedFields = signInSchema.safeParse(values)

        if (!validatedFields.success) {
            return customResponse({
                success: false,
                error: { message: "Invalid fields!" },
                status: 400
            })
        }

        const { email, password } = validatedFields.data

        const existingUser = await db.user.findFirst({
            where: { email }
        })

        if (!existingUser || !existingUser.email || !existingUser.password) {
            return customResponse({
                success: false,
                error: { message: "Email does not exist!" },
                status: 404
            })
        }

        const isPasswordValid = await compare(password, existingUser.password)
        if (!isPasswordValid) {
            return customResponse({
                success: false,
                error: { message: "Invalid credentials!" },
                status: 400
            })
        }

        let response

        if (!existingUser.emailVerified) {
            const url = `${process.env.BASEURL}/api/v1/auth/token/generate`

            response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({ email }),
            })

            const verificationTokenResponse = await response.json()
            const verificationToken = verificationTokenResponse.data

            // SEND VERIFICATION EMAIL
            const emailResponse = await sendVerificationEmail({
                email,
                name: existingUser.name as string,
                token: verificationToken.token,
            });

            const emailResponseData = await emailResponse.json()

            if (!emailResponseData.success) {
                return customResponse({
                    success: false,
                    error: { message: emailResponseData.error.message },
                    status: emailResponse.status
                })
            }

            return customResponse({
                success: false,
                error: { message: "Verify your account first.\nConfirmation email sent!" },
                status: 400
            })
        }

        const signInResponse = await signIn("credentials", {
            redirect: false ,
            email,
            password,
        });

        if (signInResponse?.error) {
            return customResponse({
                success: false,
                error: { message: signInResponse.error },
                status: 400,
            });
        }

        return customResponse({
            success: true,
            message: "Login successful!",
            data: existingUser,
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