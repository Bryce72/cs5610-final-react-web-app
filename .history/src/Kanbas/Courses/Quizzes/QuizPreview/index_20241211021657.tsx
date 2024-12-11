import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextQuestion, prevQuestion, selectAnswer, resetQuiz } from "./reducer";

export default function QuizPreview() {
  const dispatch = useDispatch();
  const { questions, currentQuestionIndex, selectedAnswers } = useSelector(
    (state: {
      quizPreview: {
        questions: any[];
        currentQuestionIndex: number;
        selectedAnswers: string[];
      };
    }) => state.quizPreview
  );
  const [startTime] = useState("Nov 29 at 8:19am");

  const handleAnswerSelection = (answer: string) => {
    dispatch(selectAnswer({ questionIndex: currentQuestionIndex, answer }));
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Quiz Title */}
      <h1 className="text-xl mb-1">Q1 - HTML</h1>

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
            <input type="checkbox" className="opacity-0" />{" "}
            {/* Placeholder for icon */}
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
            {["True", "False"].map((answer) => (
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
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-end mb-4">
        <button className="px-4 py-1 bg-white border border-gray-300 text-gray-600 rounded hover:bg-gray-50">
          Next ›
        </button>
      </div>

      {/* Quiz Footer */}
      <div className="flex justify-between items-center border border-gray-300 rounded p-2 mb-4">
        <div className="text-sm text-gray-600">Quiz saved at {startTime}</div>
        <button className="px-4 py-1 bg-white border border-gray-300 text-gray-600 rounded hover:bg-gray-50">
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
                onClick={() =>
                  dispatch({ type: "SET_QUESTION_INDEX", payload: index })
                }
                className={`flex items-center text-red-500 hover:underline ${
                  currentQuestionIndex === index ? "font-bold" : ""
                }`}
              >
                ○ Question {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
