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
    <div className="wd-main-content-offset p-4">
      <div className="row">
        {/* Main Quiz Content (Left Side) */}
        <div className="col-md-9 pe-4">
          <div className="list-group">
            {/* Questions List at Top */}
            <div className="mb-4">
              <h2 className="fs-4">Questions</h2>
              <ul className="list-unstyled">
                {[1, 2, 3].map((num) => (
                  <li key={num} className="text-danger">
                    <button
                      onClick={() => dispatch(setQuestionIndex(num - 1))}
                      className="btn btn-link text-danger text-decoration-none p-0"
                    >
                      ○ Question {num}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quiz Instructions */}
            <h2 className="fs-4 mb-4">Quiz Instructions</h2>

            {/* Question Container */}
            <div className="border rounded mb-3">
              <div className="d-flex justify-content-between p-3 bg-light border-bottom">
                <span>Question 1</span>
                <span>1 pts</span>
              </div>
              <div className="p-4">
                <p className="mb-4">
                  An HTML label element can be associated with an HTML input
                  element by setting their id attributes to the same value. The
                  resulting effect is that when you click on the label text, the
                  input element receives focus as if you had clicked on the
                  input element itself.
                </p>
                <div className="mb-3">
                  <div className="form-check mb-2">
                    <input
                      type="radio"
                      id="answer-true"
                      name="answer"
                      className="form-check-input"
                      checked={selectedAnswers[currentQuestionIndex] === "True"}
                      onChange={() => handleAnswerSelection("True")}
                    />
                    <label className="form-check-label" htmlFor="answer-true">
                      True
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      id="answer-false"
                      name="answer"
                      className="form-check-input"
                      checked={
                        selectedAnswers[currentQuestionIndex] === "False"
                      }
                      onChange={() => handleAnswerSelection("False")}
                    />
                    <label className="form-check-label" htmlFor="answer-false">
                      False
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="d-flex justify-content-between mb-3">
              <button className="btn btn-outline-secondary">‹ Previous</button>
              <button className="btn btn-outline-secondary">Next ›</button>
            </div>

            {/* Status and Submit */}
            <div className="d-flex justify-content-between align-items-center border rounded p-2 mb-3">
              <small className="text-muted">Quiz saved at {lastSaveTime}</small>
              <button className="btn btn-outline-secondary">Submit Quiz</button>
            </div>

            {/* Keep Editing */}
            <div className="bg-light border rounded p-2">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="keepEditing"
                />
                <label className="form-check-label" htmlFor="keepEditing">
                  Keep Editing This Quiz
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Questions List Sidebar (Right Side) */}
        <div className="col-md-3">
          <div className="bg-light border rounded p-3">
            <h3 className="fs-5 mb-3">Questions</h3>
            <ul className="list-unstyled mb-0">
              {[1, 2, 3].map((num) => (
                <li key={num} className="mb-2">
                  <button
                    onClick={() => dispatch(setQuestionIndex(num - 1))}
                    className="btn btn-link text-danger text-decoration-none p-0"
                  >
                    ○ Question {num}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
