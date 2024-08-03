
import { auth } from "@/auth";
import customResponse from "@/lib/customResponse";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

type Subject = {
    subject: string,
    categoriesId: string[]
}

export async function POST(request: NextRequest) {
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

        if(session.user.role != "ADMIN"){
            return customResponse({
                success: false,
                error: { message: "You don't have privilege!" },
                status: 403
            })
        }

        const payload = await request.json()
        const { subject, categoriesId }: Subject = payload.values


        if (!subject || !categoriesId) {
            return customResponse({
                success: false,
                error: { message: "Field(s) missing!" },
                status: 400
            })
        }

        const name = subject.split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" ")

        const existingSubject = await db.subject.findFirst({
            where: { name }
        })

        if (existingSubject) {
            return customResponse({
                success: false,
                error: { message: "Subject already exists!" },
                status: 409
            })
        }

        const validCategories = await db.category.findMany({
            where: {
                id: {
                    in: categoriesId
                }
            }
        });

        if (validCategories.length !== categoriesId.length) {
            const invalidIds = categoriesId.filter(id => !validCategories.some(category => category.id === id));
            return customResponse({
                success: false,
                error: { message: "Category(s) does not exist!" },
                status: 404
            });
        }


        const newSubject = await db.subject.create({
            data: {
                name,
                categories: {
                    create: categoriesId.map(id => ({
                        category: {
                            connect: { id },
                        },
                    })),
                },
            },
        });

        return customResponse({
            success: true,
            message: "New subject creadted!",
            data: newSubject,
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