import { auth } from "@/auth";
import customResponse from "@/lib/customResponse";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {

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

        if(session.user.role != "ADMIN"){
            return customResponse({
                success: false,
                error: { message: "Not Authorized!" },
                status: 403
            })
        }

        if(adminAuth?.value != "true"){
            return customResponse({
                success: false,
                error: { message: "Not Authorized!" },
                status: 403
            })
        }

        const subjects = await db.subject.findMany({
            include: {
                categories: {
                    include: {
                        category: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                },
                topics: {
                    select:{
                        name: true
                    }
                },
                questions: true
            },
            orderBy: {
                name: "asc"
            }
        });

        if (!subjects || subjects.length == 0) {
            return customResponse({
                success: false,
                error: { message: `0 record found!` },
                status: 404,
            });
        }

        const count: number = subjects.length;

        return customResponse({
            success: true,
            message: `${count} records found!`,
            data: subjects,
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