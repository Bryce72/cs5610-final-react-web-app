import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addQuiz, setQuizzes } from "./quizDetailReducer";
import * as coursesClient from "../client";
import { Badge, Button, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import { FaPencilAlt, FaPlus } from "react-icons/fa";
import * as client from "../client";
import React from "react";
import { format } from "date-fns";
import { AiOutlineStop } from "react-icons/ai";

export default function QuizDetails() {
  const navigate = useNavigate();
  const { cid, quizId } = useParams();
  console.log("Params:", cid, quizId);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPoints, setTotalPoints] = useState<number | null>(null);
  const [accessCode, setAccessCode] = useState("");
  const [accessCodeError, setAccessCodeError] = useState<string | null>(null);
  const [showAccessCodeForm, setShowAccessCodeForm] = useState(false);

  const { quizzes } = useSelector((state: any) => state.quizDetailReducer);

  // const fetchQuizzes = async () => {
  //   const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
  //   dispatch(setQuizzes(quizzes));
  // };

  // get quiz
  // need to fix for quizid
  const fetchQuizzes = async () => {
    //const quizzes = await client.getQuizById("674d46596fa4204ec2faf6be");
    const quizzes = await client.getQuizById(quizId);

    dispatch(setQuizzes(quizzes));
  };

  const togglePublish = async () => {
    if (!quiz) return;

    const updatedQuiz = { ...quiz, published: !quiz.published };
    try {
      await client.updateQuiz(updatedQuiz);
      dispatch(setQuizzes([updatedQuiz]));
    } catch (err: any) {
      setError(err.message);
    }
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
  //const quiz = quizzes && quizzes.length > 0 ? quizzes[0] : [];
  console.log("check quiz", quiz);
  if (!quiz) {
    return <p>Loading...</p>;
  }

  const handlePreviewClick = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/QuizPreview`);
  };

  return (
    <div className="container quiz-details-container mt-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>{quiz.name || "Quiz Title"}</h1>
        <div className="action-buttons">
          <button
            id="wd-publish-btn"
            className={`btn btn-lg me-1 ${
              quiz.published ? "btn-success" : "btn-danger"
            }`}
            onClick={togglePublish}
          >
            {quiz.published ? <FaPlus /> : <AiOutlineStop />}
            {quiz.published ? " Published" : " Unpublished"}
          </button>
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
          {/* Display total points */}
          <strong>Points:</strong>{" "}
          {totalPoints !== null ? totalPoints : quiz.total_points || 0}
        </p>
        <p>
          <strong>Assignment Group:</strong>
          {quiz.assignment_group || "Quizzes"}
        </p>
        <p>
          <strong>Shuffle Answers:</strong>
          {quiz.shuffle_answers ? "Yes" : "No"}
        </p>
        <p>
          <strong>Time Limit:</strong> {quiz.time_limit_minutes} Minutes
        </p>
        <p>
          <strong>Multiple Attempts:</strong>{" "}
          {quiz.multi_attempts ? "Yes" : "No"}
        </p>
        {quiz.multi_attempts && (
          <p>
            <strong>Attempts Allowed:</strong> {quiz.attempts || 1}
          </p>
        )}
        <p>
          <strong>View Responses:</strong> Always
        </p>
        <p>
          <strong>Show Correct Answers:</strong>{" "}
          {quiz.show_answer ? quiz.show_answer : "Immediately"}
        </p>
        <p>
          <strong>One Question at a Time:</strong>{" "}
          {quiz.questions_one_by_one ? "Yes" : "No"}
        </p>
        <p>
          <strong>Require Respondus Lockdown Browser:</strong> No
        </p>
        <p>
          <strong>Required to View Quiz Results:</strong> No
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
          onClick={handlePreviewClick} // Add this line
        >
          Preview
        </Button>
      </div>
    </div>
  );
}

// import { useNavigate, useParams } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
// import { addQuiz, setQuizzes } from "./quizDetailReducer";
// import * as coursesClient from "../client";
// import { Badge, Button, Table } from "react-bootstrap";
// import { useEffect } from "react";
// import { FaPencilAlt } from "react-icons/fa";
// import * as client from "../client";
// import React from "react";

// export default function QuizDetails() {
//   const router = useNavigate();
//   const { cid, quizId } = useParams();
//   console.log("Params:", cid, quizId);
//   const dispatch = useDispatch();
//   const { quizzes } = useSelector((state: any) => state.quizDetailReducer);

//   // const fetchQuizzes = async () => {
//   //   const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
//   //   dispatch(setQuizzes(quizzes));
//   // };

//   // get quiz
//   // need to fix for quizid
//   const fetchQuizzes = async () => {
//     //const quizzes = await client.getQuizById("674d46596fa4204ec2faf6be");
//     const quizzes = await client.getQuizById(quizId);

//     dispatch(setQuizzes(quizzes));
//   };

//   useEffect(() => {
//     fetchQuizzes();
//   }, []);

//   const createQuizForCourse = async () => {
//     if (!cid) return;
//     const newQuiz = await coursesClient.createQuizForCourse(cid as string);
//     dispatch(addQuiz(newQuiz));
//   };

//   const handleCreate = () => {
//     createQuizForCourse();
//   };

//   // Placeholder for the quiz being viewed
//   const quiz = quizzes && quizzes.length > 0 ? quizzes[0] : null;
//   //const quiz = quizzes && quizzes.length > 0 ? quizzes[0] : [];
//   console.log("check quiz", quiz);
//   if (!quiz) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="container quiz-details-container mt-4">
//       {/* Header Section */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h1>{quiz.name || "Quiz Title"}</h1>
//         <div className="action-buttons">
//           <Badge
//             bg="success"
//             className="me-2"
//             style={{
//               fontSize: "1rem",
//               padding: "8px 16px",
//               display: "inline-flex",
//               alignItems: "center",
//             }}
//           >
//             <span style={{ marginRight: "8px" }}>✓</span> Published
//           </Badge>
//           <Button
//             variant="secondary"
//             className="me-2"
//             style={{ fontSize: "1rem", padding: "8px 16px" }}
//           >
//             Preview
//           </Button>
//           <Button
//             variant="secondary"
//             className="me-2"
//             style={{ fontSize: "1rem", padding: "8px 16px" }}
//           >
//             <FaPencilAlt className="me-2" />
//             Edit
//           </Button>
//           <Button
//             variant="outline-secondary"
//             style={{ fontSize: "1rem", padding: "8px 16px" }}
//           >
//             ...
//           </Button>
//         </div>
//       </div>

//       <hr />

//       {/* Quiz Details */}
//       <div className="quiz-details">
//         <p>
//           <strong>Quiz Type:</strong> {quiz.quiz_type || "Graded Quiz"}
//         </p>
//         <p>
//           <strong>Points:</strong> {quiz.total_points || 0}
//         </p>
//         <p>
//           <strong>Assignment Group:</strong>{" "}
//           {quiz.assignment_group || "Quizzes"}
//         </p>
//         <p>
//           <strong>Shuffle Answers:</strong>{" "}
//           {quiz.shuffle_answers ? "Yes" : "No"}
//         </p>
//         <p>
//           <strong>Time Limit:</strong> {quiz.time_limit_minutes} Minutes
//         </p>
//         <p>
//           <strong>Multiple Attempts:</strong>{" "}
//           {quiz.multi_attempts ? "Yes" : "No"}
//         </p>
//         <p>
//           <strong>Show Correct Answers:</strong> {quiz.show_answer || "No"}
//         </p>
//         <p>
//           <strong>Access Code:</strong> {quiz.passcode || "None"}
//         </p>
//         <p>
//           <strong>One Question at a Time:</strong>{" "}
//           {quiz.questions_one_by_one ? "Yes" : "No"}
//         </p>
//         <p>
//           <strong>Webcam Required:</strong>{" "}
//           {quiz.webcam_required ? "Yes" : "No"}
//         </p>
//         <p>
//           <strong>Lock Questions After Answering:</strong>{" "}
//           {quiz.lock_questions ? "Yes" : "No"}
//         </p>
//       </div>

//       <hr />

//       {/* Dates Table */}
//       <Table bordered>
//         <thead>
//           <tr>
//             <th>Due</th>
//             <th>For</th>
//             <th>Available from</th>
//             <th>Until</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>{new Date(quiz.due).toLocaleString()}</td>
//             <td>Everyone</td> {/* Placeholder for the "For" column */}
//             <td>{new Date(quiz.available_from).toLocaleString()}</td>
//             <td>{new Date(quiz.available_until).toLocaleString()}</td>
//           </tr>
//         </tbody>
//       </Table>

//       <div className="text-center mt-4">
//         <Button
//           variant="danger"
//           style={{ fontSize: "1rem", padding: "10px 20px" }}
//         >
//           Preview
//         </Button>
//       </div>
//     </div>
//   );
// }
