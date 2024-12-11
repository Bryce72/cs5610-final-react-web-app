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
    <div className="wd-main-content-offset p-3">
      {/* Questions List at Top */}
      <div className="mb-4">
        <h3 className="fs-5 mb-3">Questions</h3>
        <ul className="list-group">
          {questions?.map((_, index) => (
            <li key={index} className="list-group-item border-0 p-1">
              <button
                onClick={() => dispatch(setQuestionIndex(index))}
                className="btn btn-link text-danger text-decoration-none p-0"
              >
                <span className="me-2">
                  {selectedAnswers[index] ? "●" : "○"}
                </span>
                Question {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="list-group rounded-0">
        {/* Quiz Title */}
        <div className="list-group-item bg-light p-3">
          <h1 className="fs-4 mb-0">Quiz Instructions</h1>
        </div>

        {/* Question Container */}
        <div className="list-group-item p-0 border">
          {/* Question Header */}
          <div className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
            <span>Question {currentQuestionIndex + 1}</span>
            <span className="text-secondary">
              {questions[currentQuestionIndex]?.points} pts
            </span>
          </div>

          {/* Question Content */}
          <div className="p-4">
            <p className="mb-4">{questions[currentQuestionIndex]?.question}</p>
            <div className="mb-3">
              {questions[currentQuestionIndex]?.answers.map(
                (answer: string) => (
                  <div key={answer} className="form-check mb-2">
                    <input
                      type="radio"
                      id={`answer-${answer}`}
                      name="answer"
                      className="form-check-input"
                      checked={selectedAnswers[currentQuestionIndex] === answer}
                      onChange={() => handleAnswerSelection(answer)}
                    />
                    <label
                      htmlFor={`answer-${answer}`}
                      className="form-check-label"
                    >
                      {answer}
                    </label>
                  </div>
                )
              )}
            </div>

            {/* Last Saved Time */}
            {selectedAnswers[currentQuestionIndex] && (
              <div className="text-secondary small">
                Last saved: {questionSaveTimes[currentQuestionIndex]}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="list-group-item bg-white p-3 d-flex justify-content-between border">
          <button
            onClick={() => dispatch(prevQuestion())}
            className="btn btn-outline-secondary btn-sm"
          >
            ‹ Previous
          </button>
          <button
            onClick={() => dispatch(nextQuestion())}
            className="btn btn-outline-secondary btn-sm"
          >
            Next ›
          </button>
        </div>

        {/* Quiz Footer */}
        <div className="list-group-item d-flex justify-content-between align-items-center p-3">
          <div className="text-secondary small">
            Quiz saved at {lastSaveTime}
          </div>
          <button className="btn btn-outline-secondary btn-sm">
            Submit Quiz
          </button>
        </div>

        {/* Keep Editing Section */}
        <div className="list-group-item bg-light p-3">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="keepEditing"
            />
            <label
              className="form-check-label text-secondary small"
              htmlFor="keepEditing"
            >
              Keep Editing This Quiz
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
