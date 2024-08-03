import customResponse from "@/lib/customResponse";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {

    try {
        const categories = await db.category.findMany({
            include: {
                subjects: {
                    select: {
                        subject: true,
                        
                    }
                }
            }
        });

        if (!categories || categories.length == 0) {
            return customResponse({
                success: false,
                error: { message: `0 record found!` },
                status: 404,
            });
        }

        const count: number = categories.length;

        return customResponse({
            success: true,
            message: `${count} records found!`,
            data: categories,
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