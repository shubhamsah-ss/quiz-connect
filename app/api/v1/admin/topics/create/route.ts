import { auth } from "@/auth";
import customResponse from "@/lib/customResponse";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

type Topic = {
    topic: string,
    subjectId: string
}

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

        const payload = await request.json()
        const { topic, subjectId }: Topic = payload.values
        
        if(!topic || !subjectId){
            return customResponse({
                success: false,
                error: { message: "Field(s) missing!" },
                status: 400
            })
        }

        const name = topic.trim().split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" ")
        
        const existingTopic = await db.topic.findFirst({
            where: { name }
        })

        if(existingTopic){
            return customResponse({
                success: false,
                error: { message: "Topic already exists!" },
                status: 409
            })
        }

        const validSubject = await db.subject.findFirst({
            where: { id: subjectId }
        })

        if(!validSubject){
            return customResponse({
                success: false,
                error: { message: "Subject does not exists!" },
                status: 500
            })
        }

        const newTopic = await db.topic.create({
            data: {
                name, subjectId
            }
        })

        return customResponse({
            success: true,
            message: "New topic created!",
            data: newTopic,
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