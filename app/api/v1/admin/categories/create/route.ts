import { NextRequest } from "next/server"
import customResponse from "@/lib/customResponse"
import { db } from "@/lib/db";
import { auth } from "@/auth";

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

        if(session.user.role != "ADMIN"){
            return customResponse({
                success: false,
                error: { message: "Not Authorized!" },
                status: 403
            })
        }

        const payload = await request.json();
        const category: string = payload.values.category

        if (!category) {
            return customResponse({
                success: false,
                error: { message: "Category name is required!" },
                status: 400
            })
        }

        const name = category.toUpperCase()

        const existingCategory = await db.category.findFirst({
            where: { name }
        });

        if (existingCategory) {
            return customResponse({
                success: false,
                error: { message: "Category already exists!" },
                status: 409
            })
        }

        const newCategory = await db.category.create({
            data: { name }
        });

        return customResponse({
            success: true,
            message: "New category created!",
            data: newCategory,
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