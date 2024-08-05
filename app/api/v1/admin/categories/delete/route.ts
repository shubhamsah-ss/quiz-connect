import { NextRequest } from "next/server"
import customResponse from "@/lib/customResponse"
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { cookies } from "next/headers";

export async function DELETE(request: NextRequest) {
    const session = await auth()
    const cookiesStore = cookies()
    const adminAuth = cookiesStore.get("adminAuth")
    const searchParams = request.nextUrl.searchParams;

    try {

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

        if(session.user.role != "ADMIN"){
            return customResponse({
                success: false,
                error: { message: "Not Authorized!" },
                status: 403
            })
        }

        if(adminAuth?.value != "true"){
            return customResponse({
                success: false,
                error: { message: "Not Authorized!" },
                status: 403
            })
        }

        let id = searchParams.get("category")?.toString()

        const category = await db.category.delete({
            where: {id}
        })
        
        if (!category) {
            return customResponse({
                success: false,
                error: { message: "Something went wrong!" },
                status: 500
            })
        }

        return customResponse({
            success: true,
            message: `Category deleted!`,
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