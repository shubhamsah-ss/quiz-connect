import * as z from "zod"
export const signUpSchema = z.object({
    name: z.string()
        .min(1, { message: "Name is required." }).min(3, { message: "Name must be at least of 3 characters." })
        .max(30, { message: "Name must be not more than 30 characters." }),
    email: z.string().min(1, { message: "Email is required" }).email(),
    password: z.string().min(1, { message: "password is required" }),
    confirmPassword: z.string()
}).refine(data => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // specify the path of the error
})

export const signInSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email(),
    password: z.string().min(1, { message: "password is required" }),
})


// Define the schema for an individual option
const optionSchema = z.object({
    value: z.string().min(1, { message: "Option is required" }),
    isImage: z.boolean(),
    fileName: z.string().optional()
}).refine((data) => {
    // Validate fileName based on isImage
    if (data.isImage && !data.fileName) {
        return false; // If `isImage` is true, `fileName` must be provided
    }
    if (!data.isImage && data.fileName) {
        return false; // If `isImage` is false, `fileName` should not be provided
    }
    return true;
}, {
    message: "Invalid file name based on image status",
    path: ['fileName'], // Path to include the field in the error
});

export const QuestionSchema = z.object({
    question: z.string().min(1, { message: "Question is required" }),
    options: z.array(optionSchema).length(4, { message: "Only 4 options are accepted" }),
    correctAnswer: z.string().min(1, { message: "Correct option is required" }),
    explanation: z.string().optional(),
    categoryId: z.string().min(1, { message: "Category required" }),
    subjectId: z.string().min(1, { message: "Subject required" }),
    topicId: z.string().min(1, { message: "Topic required" })
});

export const ProfileSchema = z.object({
    name: z.string()
        .min(3, { message: "Name must be at least of 3 characters." })
        .max(30, { message: "Name must be not more than 30 characters." }),
    image: z.string(),
    email: z.string().email(),
    emailVerified: z.string()
})

export const PasswordSchema = z.object({
    password: z.string().min(1, { message: "password is required" }),
    confirmPassword: z.string()
}).refine(data => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // specify the path of the error
})


export const AdminPinSchema = z.object({
    adminPin: z.string().length(4, { message: "PIN must be of 4 digits"})
})