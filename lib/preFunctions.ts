"use server"
import { cookies } from "next/headers"

export async function preLogout() {
    const cookiesStore = cookies()
    cookiesStore.delete("adminAuth")
}