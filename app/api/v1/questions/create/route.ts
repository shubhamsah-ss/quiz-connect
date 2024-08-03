import { auth } from "@/auth";
import customResponse from "@/lib/customResponse";
import { db } from "@/lib/db";
import { QuestionSchema } from "@/schema/formSchemas";
import { NextRequest } from "next/server";
import { z } from "zod";

export const POST = async (request: NextRequest) => {
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
        const values: z.infer<typeof QuestionSchema> = payload.values
        const validatedFields = QuestionSchema.safeParse(values)

        if (!validatedFields.success) {
            return customResponse({
                success: false,
                error: { message: "Invalid field(s)! check your all input fields." },
                status: 400
            });
        }

        const existingQuestion = await db.question.findFirst({
            where: { question: validatedFields.data.question }
        })

        if (existingQuestion) {
            return customResponse({
                success: false,
                error: { message: "Similar question exists!" },
                status: 409
            })
        }
        const data = validatedFields.data
        // Validate related entities
        const [existingUser, existingCategory, existingSubject, existingTopic] = await Promise.all([
            db.user.findUnique({ where: { id: session.user.id } }),
            db.category.findUnique({ where: { id: data.categoryId } }),
            db.subject.findUnique({ where: { id: data.subjectId } }),
            db.topic.findUnique({ where: { id: data.topicId } }),
        ]);

        if (!existingUser) {
            return customResponse({
                success: false,
                error: { message: "Invalid user details!" },
                status: 404,
            });
        }

        if (!existingCategory) {
            return customResponse({
                success: false,
                error: { message: "Invalid category details!" },
                status: 404,
            });
        }

        if (!existingSubject) {
            return customResponse({
                success: false,
                error: { message: "Invalid subject details!" },
                status: 404,
            });
        }

        if (!existingTopic) {
            return customResponse({
                success: false,
                error: { message: "Invalid topic details!" },
                status: 404,
            });
        }

        
        const newQuestion = await db.question.create({
            data: {
                question: data.question,
                correctAnswer: data.correctAnswer,
                explanation: data.explanation,
                categoryId: data.categoryId,
                subjectId: data.subjectId,
                topicId: data.topicId,
                options: {
                    create: data.options.map(option => ({
                        value: option.value,
                        isImage: option.isImage,
                        fileName: option.fileName,
                    })),
                },
                userId: session.user.id,
            },
        });

        return customResponse({
            success: true,
            message: "Your question has been successfully submitted and is pending approval. It will be reviewed by an admin before being published.",
            data: newQuestion,
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

