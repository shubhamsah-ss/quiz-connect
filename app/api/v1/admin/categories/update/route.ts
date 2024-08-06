import { NextRequest } from "next/server"
import customResponse from "@/lib/customResponse"
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { cookies } from "next/headers";

export async function PATCH(request: NextRequest) {
    const session = await auth()
    const cookiesStore = cookies()
    const adminAuth = cookiesStore.get("adminAuth")

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

        if (session.user.role != "ADMIN") {
            return customResponse({
                success: false,
                error: { message: "Not Authorized!" },
                status: 403
            })
        }

        if (adminAuth?.value != "true") {
            return customResponse({
                success: false,
                error: { message: "Not Authorized!" },
                status: 403
            })
        }

        const payload = await request.json();
        const category: string = payload.values.category
        const id: string = payload.values.id

        if (!category) {
            return customResponse({
                success: false,
                error: { message: "New category name is required!" },
                status: 400
            })
        }

        const name = category.toUpperCase()

        const existingCategory = await db.category.findFirst({
            where: {
                name,
                id: {
                    not: id
                }
            }
        });

        if (existingCategory) {
            return customResponse({
                success: false,
                error: { message: "Category already exists!" },
                status: 409
            })
        }

        const categoryToUpdate = await db.category.findUnique({ where: { id } });

        if (!categoryToUpdate) {
            return customResponse({
                success: false,
                error: { message: "Category not found!" },
                status: 404
            });
        }

        const newCategory = await db.category.update({
            where: { id },
            data: { name }
        });

        return customResponse({
            success: true,
            message: "Category details updated!",
            data: newCategory,
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