import { auth } from "@/auth";
import customResponse from "@/lib/customResponse";
import { db } from "@/lib/db";
import { PasswordSchema } from "@/schema/formSchemas";
import { hash } from "bcryptjs";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function PATCH(request: NextRequest) {
    try {
        const session = await auth()

        if (!session || !session.user) {
            return customResponse({
                success: false,
                error: { message: "Please login again!" },
                status: 401
            })
        }

        if (new Date(session.expires) < new Date()) {
            return customResponse({
                success: false,
                error: { message: "session expired, Please login again!" },
                status: 401
            })
        }

        const payload = await request.json()
        const values: z.infer<typeof PasswordSchema> = payload.values
        const validatedFields = PasswordSchema.safeParse(values)

        if (!validatedFields.success) {
            return customResponse({
                success: false,
                error: { message: "Invalid field(s)! check your all input fields." },
                status: 400
            });
        }

        const hashedPassword = await hash(validatedFields.data.password, 10)

        const user = await db.user.update({
            where: { id: session.user.id },
            data: {
                password: hashedPassword
            }
        })

        return customResponse({
            success: true,
            message: "Password changed!",
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