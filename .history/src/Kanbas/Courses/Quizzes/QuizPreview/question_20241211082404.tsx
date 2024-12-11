import React from "react";

interface QuestionProps {
  question: string;
  type: "true-false" | "multiple-choice" | "fill-blanks";
  choices?: (string | boolean)[];
  solution?: string | string[] | boolean;
  points: number;
  onAnswer: (answer: string | boolean) => void;
  selectedAnswer: string | boolean | null;
}

export default function Question({
  question,
  type,
  choices,
  onAnswer,
  selectedAnswer,
}: QuestionProps) {
  const renderAnswerOptions = () => {
    switch (type) {
      case "fill-blanks":
        return (
          <div className="p-3">
            <input
              type="text"
              className="form-control"
              value={selectedAnswer?.toString() || ""}
              onChange={(e) => onAnswer(e.target.value)}
              placeholder="Enter your answer"
            />
          </div>
        );

      case "true-false":
        return (
          <ul className="list-unstyled p-3">
            {[true, false].map((value) => (
              <li key={value.toString()}>
                <label className="d-flex align-items-center">
                  <input
                    type="radio"
                    name="answer"
                    className="me-2"
                    checked={selectedAnswer === value}
                    onChange={() => onAnswer(value)}
                  />
                  {value.toString()}
                </label>
              </li>
            ))}
          </ul>
        );

      case "multiple-choice":
      default:
        return (
          <ul className="list-unstyled p-3">
            {choices?.map((choice, index) => (
              <li key={index}>
                <label className="d-flex align-items-center">
                  <input
                    type="radio"
                    name="answer"
                    className="me-2"
                    checked={selectedAnswer === choice}
                    onChange={() => onAnswer(choice)}
                  />
                  {choice.toString()}
                </label>
              </li>
            ))}
          </ul>
        );
    }
  };

  return (
    <div className="border rounded mb-3">
      <div className="p-3 bg-light border-bottom">
        <p className="mb-0">{question}</p>
      </div>
      {renderAnswerOptions()}
    </div>
  );
}
