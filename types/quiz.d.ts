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