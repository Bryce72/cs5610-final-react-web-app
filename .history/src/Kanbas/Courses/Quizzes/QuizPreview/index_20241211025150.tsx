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

  const handleNext = () => {
    dispatch(nextQuestion());
  };

  const handlePrevious = () => {
    dispatch(prevQuestion());
  };

  const handleQuestionSelect = (index: number) => {
    dispatch(setQuestionIndex(index));
  };

  const handleSubmitQuiz = () => {
    dispatch(calculateTotalPoints());
    // Add any additional submit logic here
    alert("Quiz submitted!"); // Temporary feedback
  };

  const handleKeepEditing = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeepEditing(e.target.checked);
    // Add any additional logic for keep editing
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
                {questions.map((_, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleQuestionSelect(index)}
                      className="btn btn-link text-danger text-decoration-none p-0"
                    >
                      {selectedAnswers[index] ? "●" : "○"} Question {index + 1}
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
                <span>Question {currentQuestionIndex + 1}</span>
                <span>{questions[currentQuestionIndex]?.points || 1} pts</span>
              </div>
              <div className="p-4">
                <p className="mb-4">
                  {questions[currentQuestionIndex]?.question ||
                    "An HTML label element can be associated with an HTML input element..."}
                </p>
                <div className="mb-3">
                  {(
                    questions[currentQuestionIndex]?.answers || [
                      "True",
                      "False",
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
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                ‹ Previous
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={handleNext}
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
                onClick={handleSubmitQuiz}
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
                  onChange={handleKeepEditing}
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
              {questions.map((_, index) => (
                <li key={index} className="mb-2">
                  <button
                    onClick={() => handleQuestionSelect(index)}
                    className="btn btn-link text-danger text-decoration-none p-0"
                  >
                    {selectedAnswers[index] ? "●" : "○"} Question {index + 1}
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
