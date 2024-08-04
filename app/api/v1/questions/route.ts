import customResponse from "@/lib/customResponse";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

function shuffleArray<T>(array: T[]): T[] {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle…
    while (currentIndex !== 0) {

        // Pick a remaining element…
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

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

        const page = parseInt(searchParams.get("page")?.toString() || "1")
        const take = 5
        const skip = (page-1)*take

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
                options: true,
            },
            skip,
            take,
        })

        if (!questions || questions.length == 0) {
            return customResponse({
                success: false,
                error: { message: `0 record found!` },
                status: 404,
            });
        }

        const count: number = questions.length;

        // Shuffle the questions
        const shuffledQuestions = shuffleArray(questions);

        return customResponse({
            success: true,
            message: `${count} data found!`,
            data: shuffledQuestions,
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