import { NextResponse } from "next/server"

interface CustomResponse {
    success?: boolean,
    data?: object,
    message?: string,
    status?: number,
    error?: { message: string}
}

export default function customResponse({ success, message, data, error, status}:CustomResponse) {
    return NextResponse.json(
        {
            success,
            message,
            data,
            error
        },
        { status }
    )
}