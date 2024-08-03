
import customResponse from "@/lib/customResponse";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {

    const searchParams = request.nextUrl.searchParams;
    try {

        let subject = searchParams?.get("subject")?.toString()
        if (subject) {
            subject = subject.trim().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
        }

        const topics = await db.topic.findMany({
            where: {
                subject: {
                    name: subject
                }
            },
            include: {
                subject: true,
                question: true
            }
        })

        if (!topics || topics.length == 0) {
            return customResponse({
                success: false,
                error: { message: `0 record found!` },
                status: 404,
            });
        }

        const count: number = topics.length;

        return customResponse({
            success: true,
            message: `${count} data found!`,
            data: topics,
            status: 200,
        });
    } catch (error: any) {
        return customResponse({
            success: false,
            error: { message: "Internal server error!" },
            status: 500
        })
    }
}