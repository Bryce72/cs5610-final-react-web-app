import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  nextQuestion,
  prevQuestion,
  selectAnswer,
  resetQuiz,
  setQuestionIndex,
  calculateTotalPoints,
} from "./reducer";

function formatStartTime(): string {
  const date = new Date();
  const dateOptions = { month: "short", day: "numeric" } as const;
  const dateFormatter = new Intl.DateTimeFormat("en-US", dateOptions);
  const datePart = dateFormatter.format(date);

  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  } as const;
  const timeFormatter = new Intl.DateTimeFormat("en-US", timeOptions);
  let timePart = timeFormatter.format(date);
  timePart = timePart.replace(" ", "").toLowerCase();
  return `${datePart} at ${timePart}`;
}

export default function QuizPreview() {
  const dispatch = useDispatch();
  const {
    questions,
    currentQuestionIndex,
    selectedAnswers,
    currentPoints,
    totalPoints,
  } = useSelector(
    (state: {
      quizPreview: {
        questions: any[];
        currentQuestionIndex: number;
        selectedAnswers: string[];
        currentPoints: number;
        totalPoints: number;
      };
    }) => state.quizPreview
  );

  const [startTime, setStartTime] = useState(formatStartTime());
  const [lastSaveTime, setLastSaveTime] = useState(startTime);
  const [questionSaveTimes, setQuestionSaveTimes] = useState<string[]>(
    Array(questions.length).fill(startTime)
  );

  useEffect(() => {
    setStartTime(formatStartTime());
  }, []);

  const handleAnswerSelection = (answer: string) => {
    dispatch(selectAnswer({ questionIndex: currentQuestionIndex, answer }));
    const currentTime = formatStartTime();
    setLastSaveTime(currentTime);
    setQuestionSaveTimes((prev) => {
      const newTimes = [...prev];
      newTimes[currentQuestionIndex] = currentTime;
      return newTimes;
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Content wrapper with fixed width and centered */}
      <div className="ml-[84px] flex-1 flex justify-center">
        <div className="w-full max-w-[800px] p-6">
          {/* Questions List at Top */}
          <div className="mb-6">
            <h2 className="font-medium mb-2">Questions</h2>
            <ul className="space-y-1">
              {questions?.map((_, index) => (
                <li key={index} className="text-sm">
                  <button
                    onClick={() => dispatch(setQuestionIndex(index))}
                    className="flex items-center text-red-500 hover:underline"
                  >
                    <span className="mr-2">
                      {selectedAnswers[index] ? "●" : "○"}
                    </span>
                    Question {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quiz Title */}
          <h1 className="text-xl mb-4">Quiz Instructions</h1>

          {/* Question Container */}
          <div className="border rounded-lg shadow-sm mb-4">
            <div className="flex items-center p-3 border-b bg-gray-50">
              <span>Question {currentQuestionIndex + 1}</span>
              <span className="ml-auto">1 pts</span>
            </div>

            <div className="p-5">
              <p className="mb-4">
                {questions[currentQuestionIndex]?.question}
              </p>
              <div className="space-y-3">
                {questions[currentQuestionIndex]?.answers.map(
                  (answer: string) => (
                    <div key={answer} className="flex items-start">
                      <input
                        type="radio"
                        id={`answer-${answer}`}
                        name="answer"
                        className="mt-1 mr-2"
                        checked={
                          selectedAnswers[currentQuestionIndex] === answer
                        }
                        onChange={() => handleAnswerSelection(answer)}
                      />
                      <label
                        htmlFor={`answer-${answer}`}
                        className="text-gray-700"
                      >
                        {answer}
                      </label>
                    </div>
                  )
                )}
              </div>

              {selectedAnswers[currentQuestionIndex] && (
                <div className="mt-4 text-sm text-gray-600">
                  Last saved: {questionSaveTimes[currentQuestionIndex]}
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mb-4">
            <button
              onClick={() => dispatch(prevQuestion())}
              className="px-3 py-1 border rounded hover:bg-gray-50"
            >
              ‹ Previous
            </button>
            <button
              onClick={() => dispatch(nextQuestion())}
              className="px-3 py-1 border rounded hover:bg-gray-50"
            >
              Next ›
            </button>
          </div>

          {/* Save Status and Submit */}
          <div className="flex justify-between items-center border rounded p-2 mb-4">
            <span className="text-gray-600">Quiz saved at {lastSaveTime}</span>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">
              Submit Quiz
            </button>
          </div>

          {/* Keep Editing Section */}
          <div className="bg-gray-50 border rounded p-2">
            <label className="flex items-center text-gray-600 text-sm">
              <input type="checkbox" className="mr-2" />
              Keep Editing This Quiz
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
