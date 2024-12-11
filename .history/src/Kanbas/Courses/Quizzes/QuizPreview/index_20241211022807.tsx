import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  nextQuestion,
  prevQuestion,
  selectAnswer,
  setQuestionIndex,
} from "./reducer";

// Time formatting function
function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes} Minutes, ${remainingSeconds} Seconds`;
}

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

  // Time tracking state
  const [elapsed, setElapsed] = useState(0);
  const [showTime, setShowTime] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAnswerSelection = (answer: string) => {
    dispatch(selectAnswer({ questionIndex: currentQuestionIndex, answer }));
  };

  return (
    <div className="max-w-[1100px] p-6">
      {/* Quiz Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-xl font-normal mb-1">
            TASK 00.3: Understanding of Syllabus & Policies
          </h1>
          <div className="text-gray-700 text-sm">Started: Dec 11 at 2:25am</div>
        </div>

        {/* Questions List */}
        <div className="w-48">
          <h2 className="mb-2">Questions</h2>
          <ul className="space-y-1">
            {Array.from({ length: 8 }, (_, i) => (
              <li key={i} className="text-sm">
                <button
                  onClick={() => dispatch(setQuestionIndex(i))}
                  className="flex items-center text-red-500 hover:underline"
                >
                  <span className="inline-block w-4 h-4 mr-1">○</span>
                  Question {i + 1}
                </button>
              </li>
            ))}
          </ul>

          {/* Time Elapsed */}
          <div className="mt-4 text-sm">
            <div className="flex justify-between items-center mb-1">
              <span>Time Elapsed:</span>
              <button
                onClick={() => setShowTime(!showTime)}
                className="text-xs border px-2 py-0.5 rounded"
              >
                {showTime ? "Hide Time" : "Show Time"}
              </button>
            </div>
            {showTime && <div>{formatTime(elapsed)}</div>}
          </div>
        </div>
      </div>

      {/* Quiz Instructions */}
      <div className="mb-6">
        <h2 className="text-lg font-normal mb-3">Quiz Instructions</h2>
        <p className="mb-2 text-gray-700">
          Complete this quiz on the policies of this course so that we can be
          sure that you understand the contract between you, your colleagues,
          your instructional staff, and the University.
        </p>
        <p className="mb-4 text-gray-700">
          A 90% or higher on this quiz is required to proceed in the course and
          see the contents of the first module.
        </p>
      </div>

      {/* Question Container */}
      <div className="border rounded mb-4">
        <div className="flex items-center justify-between p-3 border-b bg-gray-50">
          <div className="flex items-center">
            <input type="checkbox" className="mr-2 opacity-0" />
            <span>Question 1</span>
          </div>
          <span className="text-gray-600">1 pts</span>
        </div>

        <div className="p-5">
          <p className="mb-4">
            Did you locate and carefully read the syllabus for this course?
          </p>
          <div className="space-y-3">
            <label className="flex items-start">
              <input
                type="radio"
                name="answer"
                className="mt-1 mr-2"
                onChange={() => handleAnswerSelection("Yes")}
                checked={selectedAnswers[currentQuestionIndex] === "Yes"}
              />
              <span>
                Yes, I have carefully read the syllabus and I understand the
                policies.
              </span>
            </label>
            <label className="flex items-start">
              <input
                type="radio"
                name="answer"
                className="mt-1 mr-2"
                onChange={() => handleAnswerSelection("No")}
                checked={selectedAnswers[currentQuestionIndex] === "No"}
              />
              <span>No, I have not yet read the syllabus.</span>
            </label>
            <label className="flex items-start">
              <input
                type="radio"
                name="answer"
                className="mt-1 mr-2"
                onChange={() => handleAnswerSelection("Cannot")}
                checked={selectedAnswers[currentQuestionIndex] === "Cannot"}
              />
              <span>I cannot find the syllabus.</span>
            </label>
            <label className="flex items-start">
              <input
                type="radio"
                name="answer"
                className="mt-1 mr-2"
                onChange={() => handleAnswerSelection("None")}
                checked={selectedAnswers[currentQuestionIndex] === "None"}
              />
              <span>There is no syllabus for this course.</span>
            </label>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-end mb-4">
        <button className="px-3 py-1 border rounded hover:bg-gray-50">
          Next ›
        </button>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center border rounded p-2">
        <span className="text-gray-600">Not saved</span>
        <button className="px-3 py-1 border rounded hover:bg-gray-50">
          Submit Quiz
        </button>
      </div>
    </div>
  );
}
