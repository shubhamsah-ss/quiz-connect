"use client"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Report from "@/components/frontend/Report";
import parse from "html-react-parser";
import { QuestionCardProps } from "@/types/quiz";



const QuestionCard = ({ item }: QuestionCardProps) => {
    const [isExplanationNeeded, setIsExplanationNeeded] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const correctAnswer = item.options[Number(item.correctAnswer) - 1].value;

    const handleExplanation = () => {
        setIsExplanationNeeded((prev) => !prev);
    };

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
    };

    const getButtonClass = (option: string) => {
        if (selectedOption === null) return "";
        if (option === correctAnswer) return "bg-emerald-600 text-white";
        if (option === selectedOption) return "bg-red-600 text-white";
        return "";
    };

    return (
        <Card className="md:p-5 shadow-md drop-shadow-md dark:shadow-neutral-900">
            <CardHeader>
                <div className="min-w-full bg-neutral-100 dark:bg-neutral-900 p-3 rounded-md prose lg:prose-lg xl:prose-xl">
                    <strong>Question:</strong>{parse(item.question)}
                </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
                {item.options.map((option, i) => (
                    <Button
                        variant={"outline"}
                        key={i}
                        disabled={selectedOption !== null}
                        onClick={() => handleOptionClick(option.value)}
                        className={`p-2 h-fit flex justify-between items-center ${getButtonClass(option.value)}`}
                        type="button"
                    >
                        <div className="flex-1 flex justify-center">
                            {option.isImage ? (
                                <Image
                                    src={option.value}
                                    alt={`Option ${i + 1}`}
                                    width={100}
                                    height={100}
                                    className="w-full rounded-md object-contain p-2"
                                />
                            ) : (
                                <p>{option.value}</p>
                            )}
                        </div>
                    </Button>
                ))}
            </CardContent>
            <CardFooter className="flex flex-col space-y-5">
                <div className="flex items-center justify-between w-full">
                    <Button variant={"outline"} type="button" onClick={handleExplanation}>
                        Explanation
                    </Button>
                    <Report id={item.id} />
                </div>
                {isExplanationNeeded && (
                    <div className="bg-neutral-100 dark:bg-neutral-900 p-3 rounded-md w-full">
                        <p>{parse(item.explanation || "No explanation given for this question.")}</p>
                    </div>
                )}
            </CardFooter>
        </Card>
    );
};

export default QuestionCard;
