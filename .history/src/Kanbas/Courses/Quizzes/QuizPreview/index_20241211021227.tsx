import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextQuestion, prevQuestion, selectAnswer, resetQuiz } from "./reducer";

export default function QuizPreview() {
  const dispatch = useDispatch();
  const { questions, currentQuestionIndex, selectedAnswers } = useSelector(
    (state) => state.quizPreview
  );

  const [startTime] = useState("Nov 29 at 8:19am");

  const handleAnswerSelection = (answer: string) => {
    dispatch(selectAnswer({ questionIndex: currentQuestionIndex, answer }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Preview Notice */}
      <div className="bg-red-50 text-red-600 p-3 rounded mb-4">
        This is a preview of the published version of the quiz
      </div>

      {/* Quiz Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Q1 - HTML</h1>
        <p className="text-gray-600">Started: {startTime}</p>
      </div>

      {/* Main Quiz Content */}
      <div className="flex gap-6">
        {/* Question Area */}
        <div className="flex-grow">
          <div className="bg-white border rounded-lg shadow-sm p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">
                Question {currentQuestionIndex + 1}
              </h2>
              <span className="text-gray-600">
                {questions[currentQuestionIndex]?.points} pts
              </span>
            </div>

            <div className="mb-6">
              <p className="mb-4">
                {questions[currentQuestionIndex]?.question}
              </p>
              <div className="space-y-2">
                {questions[currentQuestionIndex]?.answers.map(
                  (answer, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="radio"
                        id={`answer-${index}`}
                        name="answer"
                        className="mr-2"
                        checked={
                          selectedAnswers[currentQuestionIndex] === answer
                        }
                        onChange={() => handleAnswerSelection(answer)}
                      />
                      <label
                        htmlFor={`answer-${index}`}
                        className="text-gray-700"
                      >
                        {answer}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <div className="space-x-2">
                <button
                  onClick={() => dispatch(prevQuestion())}
                  disabled={currentQuestionIndex === 0}
                  className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => dispatch(nextQuestion())}
                  disabled={currentQuestionIndex === questions.length - 1}
                  className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Submit Quiz
              </button>
            </div>
          </div>

          <div className="text-sm text-gray-500">Quiz saved at {startTime}</div>
        </div>

        {/* Questions List Sidebar */}
        <div className="w-64">
          <div className="bg-white border rounded-lg shadow-sm p-4">
            <h3 className="font-semibold mb-3">Questions</h3>
            <div className="space-y-2">
              {questions?.map((_, index) => (
                <button
                  key={index}
                  onClick={() =>
                    dispatch({ type: "SET_QUESTION_INDEX", payload: index })
                  }
                  className={`w-full text-left px-3 py-2 rounded ${
                    currentQuestionIndex === index
                      ? "bg-blue-50 text-blue-700"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <span className="text-red-500 mr-2">
                    {selectedAnswers[index] ? "●" : "○"}
                  </span>
                  Question {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
