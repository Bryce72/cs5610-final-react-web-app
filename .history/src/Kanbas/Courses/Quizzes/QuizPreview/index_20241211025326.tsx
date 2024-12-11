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
  const [keepEditing, setKeepEditing] = useState(false);

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
            {/* Quiz Instructions */}
            <h2 className="fs-4 mb-4">Quiz Instructions</h2>

            {/* Question Container */}
            <div className="border rounded mb-3">
              <div className="d-flex justify-content-between p-3 bg-light border-bottom">
                <span>Question {currentQuestionIndex + 1}</span>
                <span>{questions[currentQuestionIndex]?.points || 1} pts</span>
              </div>
              <div className="p-4">
                <p className="mb-4">
                  {questions[currentQuestionIndex]?.question ||
                    "Which HTML tag is used to define an unordered list?"}
                </p>
                <div className="mb-3">
                  {(
                    questions[currentQuestionIndex]?.answers || [
                      "<ul>",
                      "<ol>",
                      "<li>",
                      "<list>",
                    ]
                  ).map((answer: string) => (
                    <div key={answer} className="form-check mb-2">
                      <input
                        type="radio"
                        id={`answer-${answer}`}
                        name="answer"
                        className="form-check-input"
                        checked={
                          selectedAnswers[currentQuestionIndex] === answer
                        }
                        onChange={() => handleAnswerSelection(answer)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`answer-${answer}`}
                      >
                        {answer}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="d-flex justify-content-between mb-3">
              <button
                className="btn btn-outline-secondary"
                onClick={() => dispatch(prevQuestion())}
                disabled={currentQuestionIndex === 0}
              >
                ‹ Previous
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => dispatch(nextQuestion())}
                disabled={currentQuestionIndex === questions.length - 1}
              >
                Next ›
              </button>
            </div>

            {/* Status and Submit */}
            <div className="d-flex justify-content-between align-items-center border rounded p-2 mb-3">
              <small className="text-muted">Quiz saved at {lastSaveTime}</small>
              <button
                className="btn btn-outline-secondary"
                onClick={() => dispatch(calculateTotalPoints())}
              >
                Submit Quiz
              </button>
            </div>

            {/* Keep Editing */}
            <div className="bg-light border rounded p-2">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="keepEditing"
                  checked={keepEditing}
                  onChange={(e) => setKeepEditing(e.target.checked)}
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
            <div className="d-flex flex-column gap-2">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => dispatch(setQuestionIndex(index))}
                  className={`text-start border-0 bg-transparent text-danger p-0 ${
                    currentQuestionIndex === index ? "fw-bold" : ""
                  }`}
                >
                  <span className="me-2">○</span>
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
