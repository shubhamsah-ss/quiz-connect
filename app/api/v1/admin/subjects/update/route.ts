
import { auth } from "@/auth";
import customResponse from "@/lib/customResponse";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

type Subject = {
    id: string,
    subject: string,
    categoriesId: string[]
}

export async function PATCH(request: NextRequest) {
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

        const payload = await request.json()
        const { subject, categoriesId, id }: Subject = payload.values


        if (!subject || !categoriesId) {
            return customResponse({
                success: false,
                error: { message: "Field(s) missing!" },
                status: 400
            })
        }

        const name = subject.trim().split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" ")

        const existingSubject = await db.subject.findFirst({
            where: {
                name,
                id: {
                    not: id
                }
            }
        });

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

        const existingAssociations = await db.categorySubject.findMany({
            where: {
                subjectId: id,
                categoryId: {
                    in: categoriesId
                }
            }
        });

        const newCategoryIds = categoriesId.filter(id => !existingAssociations.some(assoc => assoc.categoryId === id));


        const subjectToUpdate = await db.subject.findUnique({ where: { id } });

        if (!subjectToUpdate) {
            return customResponse({
                success: false,
                error: { message: "Subject not found!" },
                status: 404
            });
        }

        const newSubject = await db.subject.update({
            where: { id },
            data: {
                name,
                categories: {
                    create: newCategoryIds.map(id => ({
                        category: {
                            connect: { id },
                        },
                    })),
                },
            },
        });

        return customResponse({
            success: true,
            message: "Subject details updated!",
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