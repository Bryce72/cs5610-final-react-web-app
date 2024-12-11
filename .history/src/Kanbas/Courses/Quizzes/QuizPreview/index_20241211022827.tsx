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

// Format time utility function
function formatStartTime(): string {
  const date = new Date();

  // Format the date part (e.g., "Nov 29")
  const dateOptions = {
    month: "short",
    day: "numeric",
  } as const;
  const dateFormatter = new Intl.DateTimeFormat("en-US", dateOptions);
  const datePart = dateFormatter.format(date);

  // Format the time part (e.g., "8:19am")
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  } as const;
  const timeFormatter = new Intl.DateTimeFormat("en-US", timeOptions);
  let timePart = timeFormatter.format(date);

  // Remove the space before "AM"/"PM" and convert to lowercase
  timePart = timePart.replace(" ", "").toLowerCase();

  // Combine date and time parts
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

  // State for tracking times
  const [startTime, setStartTime] = useState(formatStartTime());
  const [lastSaveTime, setLastSaveTime] = useState(startTime);
  const [questionSaveTimes, setQuestionSaveTimes] = useState<string[]>(
    Array(questions.length).fill(startTime)
  );

  // Set initial start time when component mounts
  useEffect(() => {
    setStartTime(formatStartTime());
  }, []);

  const handleAnswerSelection = (answer: string) => {
    dispatch(selectAnswer({ questionIndex: currentQuestionIndex, answer }));

    // Update save time for the current question
    const currentTime = formatStartTime();
    setLastSaveTime(currentTime);
    setQuestionSaveTimes((prev) => {
      const newTimes = [...prev];
      newTimes[currentQuestionIndex] = currentTime;
      return newTimes;
    });
  };

  const handleNext = () => {
    dispatch(nextQuestion());
  };

  const handlePrevious = () => {
    dispatch(prevQuestion());
  };

  const handleSubmitQuiz = () => {
    dispatch(calculateTotalPoints());
    setLastSaveTime(formatStartTime());
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Quiz Title and Points */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl">Q1 - HTML</h1>
        <div className="text-gray-600">
          Score: {currentPoints} / {totalPoints} points
        </div>
      </div>

      {/* Preview Notice */}
      <div className="bg-red-50 text-red-600 p-2 text-sm mb-4 rounded">
        ⓘ This is a preview of the published version of the quiz
      </div>

      {/* Started Time */}
      <div className="text-gray-700 text-sm mb-4">Started: {startTime}</div>

      {/* Quiz Instructions */}
      <h2 className="text-base font-normal text-gray-800 mb-4">
        Quiz Instructions
      </h2>

      {/* Question Container */}
      <div className="border border-gray-300 rounded mb-4">
        {/* Question Header */}
        <div className="flex items-center border-b border-gray-300 p-2">
          <div className="w-6 h-6 flex items-center justify-center">
            <input type="checkbox" className="opacity-0" />
          </div>
          <div className="flex-1 ml-2">Question {currentQuestionIndex + 1}</div>
          <div className="text-gray-600 text-sm">
            {questions[currentQuestionIndex]?.points} pts
          </div>
        </div>

        {/* Question Content */}
        <div className="p-5">
          <p className="mb-4">{questions[currentQuestionIndex]?.question}</p>
          <div className="space-y-3">
            {questions[currentQuestionIndex]?.answers.map((answer: string) => (
              <div key={answer} className="flex items-center">
                <input
                  type="radio"
                  id={`answer-${answer}`}
                  name="answer"
                  className="mr-2"
                  checked={selectedAnswers[currentQuestionIndex] === answer}
                  onChange={() => handleAnswerSelection(answer)}
                />
                <label htmlFor={`answer-${answer}`} className="text-gray-700">
                  {answer}
                </label>
              </div>
            ))}
          </div>

          {/* Question Save Time */}
          {selectedAnswers[currentQuestionIndex] && (
            <div className="mt-4 text-sm text-gray-500">
              Last saved: {questionSaveTimes[currentQuestionIndex]}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mb-4">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="px-4 py-1 bg-white border border-gray-300 text-gray-600 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ‹ Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentQuestionIndex === questions.length - 1}
          className="px-4 py-1 bg-white border border-gray-300 text-gray-600 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next ›
        </button>
      </div>

      {/* Quiz Footer */}
      <div className="flex justify-between items-center border border-gray-300 rounded p-2 mb-4">
        <div className="text-sm text-gray-600">
          Quiz saved at {lastSaveTime}
        </div>
        <button
          onClick={handleSubmitQuiz}
          className="px-4 py-1 bg-white border border-gray-300 text-gray-600 rounded hover:bg-gray-50"
        >
          Submit Quiz
        </button>
      </div>

      {/* Keep Editing Section */}
      <div className="bg-gray-50 border border-gray-300 rounded p-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <span className="mr-2">📝</span>
          Keep Editing This Quiz
        </div>
      </div>

      {/* Questions List */}
      <div className="mb-4">
        <h3 className="mb-2">Questions</h3>
        <ul className="space-y-1">
          {questions?.map((_, index) => (
            <li key={index} className="text-sm">
              <button
                onClick={() => dispatch(setQuestionIndex(index))}
                className={`flex items-center text-red-500 hover:underline ${
                  currentQuestionIndex === index ? "font-bold" : ""
                }`}
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
