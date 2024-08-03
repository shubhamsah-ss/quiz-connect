import { auth } from "@/auth";
import customResponse from "@/lib/customResponse";
import { db } from "@/lib/db";
import { ProfileSchema } from "@/schema/formSchemas";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest) {
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

        const user = await db.user.findUnique({
            where: { id: session.user.id },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                emailVerified: true,
                },
        })

        return customResponse({
            success: true,
            message: "User found!",
            data: { user },
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
        const values: z.infer<typeof ProfileSchema> = payload.values
        const validatedFields = ProfileSchema.safeParse(values)

        const image = validatedFields.data?.image === "" ? null : validatedFields.data?.image;

        const user = await db.user.update({
            where: { id: session.user.id},
            data: {
                ...validatedFields.data,
                image
            }
        })

        return customResponse({
            success: true,
            message: "Details updated!",
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