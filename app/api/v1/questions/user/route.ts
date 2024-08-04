import { auth } from "@/auth";
import customResponse from "@/lib/customResponse";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
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

        const questions = await db.question.findMany({
            where: { userId: session.user.id },
            select: {
                id: true,
                question: true,
                category: {
                    select: {
                        name: true
                    }
                },
                subject: {
                    select: {
                        name: true
                    }
                },
                topic: {
                    select: {
                        name: true
                    }
                },
                status: true,
                approved: true,
                reports: true,
                correctAnswer: true,
                explanation: true,
                options: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        const count = questions.length

        if(!questions || count == 0) {
            return customResponse({
                success: false,
                error: { message: "No record found!" },
                status: 404
            })
        }

        return customResponse({
            success: true,
            message: `${count} record found!`,
            data: questions,
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