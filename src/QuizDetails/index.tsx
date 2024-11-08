import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";


export default function QuizDetails() {

  const [quizTitle, setQuizTitle] = useState("Q1 - HTML");
  const [quizType, setQuizType] = useState("Graded Quiz");
  const [points, setPoints] = useState(29);
  const [assignmentGroup, setAssignmentGroup] = useState("QUIZZES");
  const [shuffleAnswers, setShuffleAnswers] = useState("No");
  const [timeLimit, setTimeLimit] = useState("30 Minutes");
  const [multipleAttempts, setMultipleAttempts] = useState("No");
  const [viewResponses, setViewResponses] = useState("Always");
  const [showCorrectAnswers, setShowCorrectAnswers] = useState("Immediately");
  const [oneQuestionAtATime, setOneQuestionAtATime] = useState("Yes");
  const [lockDownBrowser, setLockDownBrowser] = useState("No");
  const [viewQuizResults, setViewQuizResults] = useState("No");
  const [webcamRequired, setWebcamRequired] = useState("No");
  const [lockQuestions, setLockQuestions] = useState("No");

  const dueDate = "Sep 21 at 1pm";
  const availableFrom = "Sep 21 at 11:40am";
  const untilDate = "Sep 21 at 1pm";

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>{quizTitle}</h3>
        <div className="d-flex align-items-center">
          <span className="badge bg-success me-2">Published</span>
          <button className="btn btn-secondary me-2">Preview</button>
          <button className="btn btn-primary">Edit</button>
        </div>
      </div>

      <hr />

      <div>
        <p>
          <strong>Quiz Type:</strong> {quizType}
        </p>
        <p>
          <strong>Points:</strong> {points}
        </p>
        <p>
          <strong>Assignment Group:</strong> {assignmentGroup}
        </p>
        <p>
          <strong>Shuffle Answers:</strong> {shuffleAnswers}
        </p>
        <p>
          <strong>Time Limit:</strong> {timeLimit}
        </p>
        <p>
          <strong>Multiple Attempts:</strong> {multipleAttempts}
        </p>
        <p>
          <strong>View Responses:</strong> {viewResponses}
        </p>
        <p>
          <strong>Show Correct Answers:</strong> {showCorrectAnswers}
        </p>
        <p>
          <strong>One Question at a Time:</strong> {oneQuestionAtATime}
        </p>
        <p>
          <strong>Require Respondus LockDown Browser:</strong> {lockDownBrowser}
        </p>
        <p>
          <strong>Required to View Quiz Results:</strong> {viewQuizResults}
        </p>
        <p>
          <strong>Webcam Required:</strong> {webcamRequired}
        </p>
        <p>
          <strong>Lock Questions After Answering:</strong> {lockQuestions}
        </p>
      </div>

      <hr />

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Due</th>
              <th>For</th>
              <th>Available from</th>
              <th>Until</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{dueDate}</td>
              <td>Everyone</td>
              <td>{availableFrom}</td>
              <td>{untilDate}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-danger">Preview</button>
      </div>
    </div>
  );
}