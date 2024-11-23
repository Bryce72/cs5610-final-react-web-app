import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Badge, Table } from "react-bootstrap";
import { loadQuizzes } from "./quizDetailReducer";

export default function QuizDetails() {
  const dispatch = useDispatch();

  // Load the quizzes from Redux state
  // comment
  const quizzes = useSelector((state: any) => state.quizDetail || []);

  // Fetch quizzes on component mount
  useEffect(() => {
    (dispatch as any)(loadQuizzes()); // Dispatch loadQuizzes instead of setQuizzes
  }, [dispatch]);

  console.log("Quizzes in Redux state:", quizzes);

  // For demonstration, let's display only the first quiz
  const quiz = quizzes.length > 0 ? quizzes[0] : null;

  if (!quiz) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-4">
      <h3>{quiz.name || "Quiz Title"}</h3>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Badge bg="success" className="me-2">
          Published
        </Badge>
        <div>
          <Button variant="secondary" className="me-2">
            Preview
          </Button>
          <Button variant="primary">Edit</Button>
        </div>
      </div>

      <hr />

      {/* Display quiz properties */}
      <div>
        <p>
          <strong>Quiz Type:</strong> {quiz.quiz_type || "Graded Quiz"}
        </p>
        <p>
          <strong>Points:</strong> {quiz.total_points || 0}
        </p>
        <p>
          <strong>Assignment Group:</strong>{" "}
          {quiz.assignment_group || "Quizzes"}
        </p>
        <p>
          <strong>Shuffle Answers:</strong>{" "}
          {quiz.shuffle_answers ? "Yes" : "No"}
        </p>
        <p>
          <strong>Time Limit:</strong> {quiz.time_limit_minutes} Minutes
        </p>
        <p>
          <strong>Multiple Attempts:</strong>{" "}
          {quiz.multi_attempts ? "Yes" : "No"}
        </p>
        <p>
          <strong>Show Correct Answers:</strong> {quiz.show_answer || "No"}
        </p>
        <p>
          <strong>Access Code:</strong> {quiz.passcode || "None"}
        </p>
        <p>
          <strong>One Question at a Time:</strong>{" "}
          {quiz.questions_one_by_one ? "Yes" : "No"}
        </p>
        <p>
          <strong>Webcam Required:</strong>{" "}
          {quiz.webcam_required ? "Yes" : "No"}
        </p>
        <p>
          <strong>Lock Questions After Answering:</strong>{" "}
          {quiz.lock_questions ? "Yes" : "No"}
        </p>
      </div>

      <hr />

      {/* Table for dates */}
      <Table bordered>
        <thead>
          <tr>
            <th>Due</th>
            <th>Available from</th>
            <th>Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{new Date(quiz.due).toLocaleString()}</td>
            <td>{new Date(quiz.available_from).toLocaleString()}</td>
            <td>{new Date(quiz.available_until).toLocaleString()}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
