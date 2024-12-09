import React from "react";

export default function Question({
  question,
  answers,
  correctAnswer,
  onAnswer,
  selectedAnswer,
}: {
  question: string;
  answers: string[];
  correctAnswer: string;
  onAnswer: (answer: string) => void;
  selectedAnswer: string | null;
}) {
  const handleAnswerClick = (answer: string) => {
    onAnswer(answer); // Notify the parent about the selected answer
  };

  return (
    <div>
      <p className="p-3">{question}</p>
      <ul style={{ listStyle: "none" }}>
        {answers.map((answer, index) => (
          <li key={index}>
            <label>
              <input
                type="radio"
                name="answer"
                value={answer}
                checked={selectedAnswer === answer}
                onChange={() => handleAnswerClick(answer)}
              />
              {answer}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
