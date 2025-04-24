"use client";
import { QuestionType } from "@/utils/TsConfig";
import "katex/dist/katex.min.css";
import PopupSolution from "./PopupSolution";
const QuestionCard = ({ question }: { question: QuestionType }) => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <div className="flex flex-col gap-4">
        <div className="text-lg font-semibold">{question?.question}</div>
        <div className="text-sm text-muted-foreground">{question.answer}</div>
        <PopupSolution solution={question.solution} />
      </div>
    </div>
  );
};

export default QuestionCard;
