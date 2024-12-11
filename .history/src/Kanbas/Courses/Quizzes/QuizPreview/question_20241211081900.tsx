import React from "react";

interface QuestionProps {
  question: string;
  type: "true-false" | "multiple-choice" | "fill-blanks";
  choices?: (string | boolean)[];
  solution?: string | string[] | boolean;
  points: number;
  onAnswer: (answer: string | boolean | string[]) => void;
  selectedAnswer: string | boolean | string[] | null;
}

export default function Question({
  question,
  type,
  choices,
  solution,
  onAnswer,
  selectedAnswer,
}: QuestionProps) {
  const handleFillBlanksChange = (value: string, index: number) => {
    // Convert selectedAnswer to array if it's not already
    const currentAnswers = Array.isArray(selectedAnswer)
      ? [...selectedAnswer]
      : Array(Array.isArray(solution) ? solution.length : 1).fill("");
    currentAnswers[index] = value;
    onAnswer(currentAnswers);
  };

  const renderAnswerOptions = () => {
    switch (type) {
      case "fill-blanks":
        // If solution is an array, create that many input boxes
        const numBlanks = Array.isArray(solution) ? solution.length : 1;
        const answers = Array.isArray(selectedAnswer)
          ? selectedAnswer
          : Array(numBlanks).fill("");

        return (
          <div className="p-3">
            {Array.from({ length: numBlanks }).map((_, index) => (
              <div key={index} className="mb-2">
                <label className="mb-1">Blank {index + 1}:</label>
                <input
                  type="text"
                  className="form-control"
                  value={answers[index] || ""}
                  onChange={(e) =>
                    handleFillBlanksChange(e.target.value, index)
                  }
                  placeholder={`Enter answer for blank ${index + 1}`}
                />
              </div>
            ))}
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
