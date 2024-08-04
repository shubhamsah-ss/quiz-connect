import { auth } from "@/auth";
import customResponse from "@/lib/customResponse";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
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

        let id = searchParams.get("question")?.toString()

        const canDelete = await db.question.findUnique({
            where: { id }
        })

        if(canDelete?.approved) {
            return customResponse({
                success: false,
                error: { message: "Approved questions can not be deleted!" },
                status: 400
            })
        }

        const questions = await db.question.delete({
            where: { id }
        })


        if (!questions) {
            return customResponse({
                success: false,
                error: { message: "Something went wrong!" },
                status: 400
            })
        }

        return customResponse({
            success: true,
            message: `Question deleted!`,
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