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

        const subjects = await db.subject.findMany({
            include: {
                categories: {
                    select: {
                        category: true
                    }
                },
                topics: true
            },
            where:{
                categories:{
                    some:{
                        category:{
                            name: category?.toString().toUpperCase()
                        }
                    }
                }
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
            message: `${count} data found!`,
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