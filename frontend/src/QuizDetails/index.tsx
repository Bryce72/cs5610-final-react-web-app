import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addQuiz, setQuizzes } from "./quizDetailReducer";
import * as coursesClient from "../client";
import { Badge, Button, Table } from "react-bootstrap";
import { useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa";

export default function Quizzes() {
  const router = useNavigate();
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);

  const fetchQuizzes = async () => {
    const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const createQuizForCourse = async () => {
    if (!cid) return;
    const newQuiz = await coursesClient.createQuizForCourse(cid as string);
    dispatch(addQuiz(newQuiz));
  };

  const handleCreate = () => {
    createQuizForCourse();
  };

  // Placeholder for the quiz being viewed
  const quiz = quizzes && quizzes.length > 0 ? quizzes[0] : null;

  if (!quiz) {
    return <p>Loading...</p>;
  }
  return (
    <div className="container quiz-details-container mt-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>{quiz.name || "Quiz Title"}</h1>
        <div className="action-buttons">
          <Badge
            bg="success"
            className="me-2"
            style={{
              fontSize: "1rem",
              padding: "8px 16px",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <span style={{ marginRight: "8px" }}>✓</span> Published
          </Badge>
          <Button
            variant="secondary"
            className="me-2"
            style={{ fontSize: "1rem", padding: "8px 16px" }}
          >
            Preview
          </Button>
          <Button
            variant="secondary"
            className="me-2"
            style={{ fontSize: "1rem", padding: "8px 16px" }}
          >
            <FaPencilAlt className="me-2" />
            Edit
          </Button>
          <Button
            variant="outline-secondary"
            style={{ fontSize: "1rem", padding: "8px 16px" }}
          >
            ...
          </Button>
        </div>
      </div>

      <hr />

      {/* Quiz Details */}
      <div className="quiz-details">
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

      {/* Dates Table */}
      <Table bordered>
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
            <td>{new Date(quiz.due).toLocaleString()}</td>
            <td>Everyone</td> {/* Placeholder for the "For" column */}
            <td>{new Date(quiz.available_from).toLocaleString()}</td>
            <td>{new Date(quiz.available_until).toLocaleString()}</td>
          </tr>
        </tbody>
      </Table>

      <div className="text-center mt-4">
        <Button
          variant="danger"
          style={{ fontSize: "1rem", padding: "10px 20px" }}
        >
          Preview
        </Button>
      </div>
    </div>
  );
}
/*
  return (
    <>
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
    </>
  );
 
}
   */
