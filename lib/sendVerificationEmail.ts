import VerificationEmail from "@/emails/verificationEmail";
import { resend } from "@/lib/resend";
import customResponse from "@/lib/customResponse";

export async function sendVerificationEmail({ name, email, token }: {
    name: string,
    email: string,
    token: string
}) {
    try {
        await resend.emails.send({
            from: "quizconnect@devss.in",
            to: email,
            subject: "Verify your account",
            react: VerificationEmail({ name, token })
        });

        return customResponse({ success: true, message: "Verification email sent successfully", status: 200 });
    } catch (error) {
        console.error("Error sending verification email", error);
        return customResponse({ success: false, error: { message: "Failed to send verification email" }, status: 500 });
    }
}