import { auth } from "@/auth";
import customResponse from "@/lib/customResponse";
import { db } from "@/lib/db";
import { AdminPinSchema } from "@/schema/formSchemas";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
    try {
        const session = await auth()

        if (!session || !session.user) {
            return customResponse({
                success: false,
                error: { message: "Not Authenticated!" },
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

        if (session.user.role != "ADMIN") {
            return customResponse({
                success: false,
                error: { message: "Not Authorized!" },
                status: 403
            })
        }

        const payload = await request.json()
        const values: z.infer<typeof AdminPinSchema> = payload.values
        const validatedFields = AdminPinSchema.safeParse(values)
        const adminPin = validatedFields.data?.adminPin

        const existingUser = await db.user.findFirst({
            where: { id: session.user.id }
        })

        if (!existingUser || existingUser.adminPin !== adminPin) {
            return customResponse({
                success: false,
                error: { message: "Invalid PIN!" },
                status: 403
            })
        }


        // await unstable_update({
        //     ...session,
        //     user: {
        //         ...session.user,
        //         adminAuth: true
        //     }
        // })

        
        // Save adminAuth in cookies
        cookies().set('adminAuth', 'true', { secure: true })

        return customResponse({
            success: true,
            message: "Authorized!",
            data: {},
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