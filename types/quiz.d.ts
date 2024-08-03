export type QuizProps = {
    query: {
        category?: string,
        subject?: string,
        topic?: string,
    }
}

export type QuestionCardProps = {
    item: {
        id: string;
        question: string;
        options: {
            value: string;
            isImage: boolean;
        }[];
        correctAnswer: string;
        explanation?: string;
    };
};

export type QuestionsType = {
    id: string,
    question: string,
    options: OptionType[],
    correctAnswer: string,
    explanation: string,
    status: QuestionStatus,
    category: {
        name: string
    },
    subject: {
        name: string
    },
    topic: {
        name: string
    },
    reports: {
        name: string
    },
    createdAt: Date,
    approved: Date,
}

export enum QuestionStatus {
    PENDING,
    APPROVED,
    REJECTED,
}

export type OptionType = {
    value: string,
    isImage: boolean,
    filename?: string,

}