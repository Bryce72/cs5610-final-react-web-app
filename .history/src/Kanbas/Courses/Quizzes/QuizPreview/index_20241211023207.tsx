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

// Format time utility function remains the same
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
  // Redux and state setup same as before
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
    <div className="flex">
      {/* Main Content */}
      <div className="ml-[200px] mr-[300px] flex-grow max-w-[800px]">
        {/* Quiz Title */}
        <h1 className="text-xl mb-1">Quiz Instructions</h1>

        {/* Question Container */}
        <div className="border border-gray-300 rounded mb-4">
          {/* Question Header */}
          <div className="flex items-center p-3 border-b bg-gray-50">
            <span>Question {currentQuestionIndex + 1}</span>
            <span className="ml-auto">
              {questions[currentQuestionIndex]?.points} pts
            </span>
          </div>

          {/* Question Content */}
          <div className="p-5">
            <p className="mb-4">{questions[currentQuestionIndex]?.question}</p>
            <div className="space-y-3">
              {questions[currentQuestionIndex]?.answers.map(
                (answer: string) => (
                  <div key={answer} className="flex items-start">
                    <input
                      type="radio"
                      id={`answer-${answer}`}
                      name="answer"
                      className="mt-1 mr-2"
                      checked={selectedAnswers[currentQuestionIndex] === answer}
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

            {/* Last Saved Time */}
            {selectedAnswers[currentQuestionIndex] && (
              <div className="mt-4 text-sm text-gray-600">
                Last saved: {questionSaveTimes[currentQuestionIndex]}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-2 mb-4">
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

        {/* Quiz Footer */}
        <div className="flex justify-between items-center border rounded p-2 mb-4">
          <div className="text-sm text-gray-600">
            Quiz saved at {lastSaveTime}
          </div>
          <button className="px-3 py-1 border rounded hover:bg-gray-50">
            Submit Quiz
          </button>
        </div>

        {/* Keep Editing Section */}
        <div className="bg-gray-50 border rounded p-2 mb-4">
          <label className="flex items-center text-gray-600 text-sm">
            <input type="checkbox" className="mr-2" />
            Keep Editing This Quiz
          </label>
        </div>
      </div>

      {/* Questions List Sidebar */}
      <div className="fixed right-4 top-20 w-[250px] bg-white p-4">
        <h3 className="font-medium mb-2">Questions</h3>
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
    </div>
  );
}
