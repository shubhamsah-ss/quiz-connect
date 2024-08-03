import customResponse from "@/lib/customResponse";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    try {
        let category = searchParams.get("category")?.toString()

        if(category) {
            category = category.trim().toUpperCase()
        }

        let subject = searchParams?.get("subject")?.toString()
        if (subject) {
            subject = subject.trim().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
        }

        let topic = searchParams?.get("topic")?.toString()
        if (topic) {
            topic = topic.trim().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
        }

        const questions = await db.question.findMany({
            where: {
                category: {
                    name: category
                },
                subject: {
                    name: subject
                },
                topic: {
                    name: topic
                },
                status: "APPROVED"
            },
            include: {
            //     category: true,
            //     subject: true,
            //     topic: true,
                options: true,
            //     reports: true,
            }
        })

        if (!questions || questions.length == 0) {
            return customResponse({
                success: false,
                error: { message: `0 record found!` },
                status: 404,
            });
        }

        const count: number = questions.length;

        return customResponse({
            success: true,
            message: `${count} data found!`,
            data: questions,
            status: 200,
        });
    } catch (error: any) {
        console.log(error)
        return customResponse({
            success: false,
            error: { message: "Internal server error!" },
            status: 500
        })
    }
}