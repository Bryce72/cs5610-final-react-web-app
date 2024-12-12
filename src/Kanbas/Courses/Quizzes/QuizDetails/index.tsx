import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import { FaPencilAlt, FaPlus } from "react-icons/fa";
import { AiOutlineStop } from "react-icons/ai";
import { addQuiz, setQuizzes } from "./quizDetailReducer";
import * as client from "../client";
import "./QuizDetails.css";
import ProtectedRole from "../../../Account/ProtectedRole";

export default function QuizDetails() {
  const navigate = useNavigate();
  const { cid, quizId } = useParams();
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);

  const { quizzes } = useSelector((state: any) => state.quizDetailReducer);

  const fetchQuizzes = async () => {
    if (!quizId) {
      console.error("Quiz ID is undefined");
      return;
    }
    const quizzes = await client.getQuizById(quizId);
    dispatch(setQuizzes(quizzes));
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const quiz = quizzes && quizzes.length > 0 ? quizzes[0] : null;

  if (!quiz) {
    return <p>Loading...</p>;
  }

  // Navigate to the first question of the quiz
  const handleTakeQuiz = () => {
    if (!quizId) {
      setError("Quiz ID is missing");
      return;
    }
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/QuizPreview`);
  };

  return (
    <div className="container quiz-details-container">
      {/* Quiz Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>{quiz.name || "Quiz Title"}</h1>
        <div className="action-buttons">
          <button
            id="wd-publish-btn"
            className={`btn btn-lg ${quiz.published ? "btn-success" : "btn-danger"
              }`}
          >
            {quiz.published ? <FaPlus /> : <AiOutlineStop />}
            {quiz.published ? " Published" : " Unpublished"}
          </button>
        </div>
      </div>
      <hr />

      {/* Quiz Details */}
      <div className="quiz-details">
        <p><strong>Quiz Type:</strong> {quiz.quiz_type || "Graded Quiz"}</p>
        <p><strong>Points:</strong> {quiz.total_points || 0}</p>
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
            <td>Everyone</td>
            <td>{new Date(quiz.available_from).toLocaleString()}</td>
            <td>{new Date(quiz.available_until).toLocaleString()}</td>
          </tr>
        </tbody>
      </Table>

      <div className="text-center mt-4">
        <Button variant="danger" onClick={handleTakeQuiz}>
          Click here To take the Quiz
        </Button>
      </div>

      {/* TODO: styling/positioning for this button */}
      <ProtectedRole role="FACULTY">
        <Button onClick={e => navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/QuizEditor`)}>
          Edit
        </Button>
      </ProtectedRole>

      {/* TODO: show this student's previous attempt and how many more times they can take this quiz*/}
    </div>
  );
}


// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
// import { Badge, Button, Table } from "react-bootstrap";
// import { FaPencilAlt, FaPlus } from "react-icons/fa";
// import { AiOutlineStop } from "react-icons/ai";
// import { addQuiz, setQuizzes } from "./quizDetailReducer";
// import * as coursesClient from "../client";
// import * as client from "../client";
// import "./QuizDetails.css";

// export default function QuizDetails() {
//   const navigate = useNavigate();
//   const { cid, quizId } = useParams();
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [totalPoints, setTotalPoints] = useState<number | null>(null);
//   const [accessCode, setAccessCode] = useState("");
//   const [accessCodeError, setAccessCodeError] = useState<string | null>(null);
//   const [showAccessCodeForm, setShowAccessCodeForm] = useState(false);

//   const { quizzes } = useSelector((state: any) => state.quizDetailReducer);

//   const fetchQuizzes = async () => {
//     if (!quizId) {
//       console.error("Quiz ID is undefined");
//       return;
//     }
//     const quizzes = await client.getQuizById(quizId);
//     dispatch(setQuizzes(quizzes));
//   };
//   useEffect(() => {
//     fetchQuizzes();
//   }, []);

//   const togglePublish = async () => {
//     const quiz = quizzes && quizzes.length > 0 ? quizzes[0] : null;
//     if (!quiz) return;

//     const updatedQuiz = { ...quiz, published: !quiz.published };
//     try {
//       await client.updateQuiz(updatedQuiz);
//       dispatch(setQuizzes([updatedQuiz]));
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   const createQuizForCourse = async () => {
//     if (!cid) return;
//     const newQuiz = await coursesClient.createQuizForCourse(cid as string);
//     dispatch(addQuiz(newQuiz));
//   };

//   const quiz = quizzes && quizzes.length > 0 ? quizzes[0] : null;

//   if (!quiz) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="container quiz-details-container">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h1>{quiz.name || "Quiz Title"}</h1>
//         <div className="action-buttons">
//           <button
//             id="wd-publish-btn"
//             className={`btn btn-lg ${
//               quiz.published ? "btn-success" : "btn-danger"
//             }`}
//             onClick={togglePublish}
//           >
//             {quiz.published ? <FaPlus /> : <AiOutlineStop />}
//             {quiz.published ? " Published" : " Unpublished"}
//           </button>
//           <Button variant="secondary" className="me-2">
//             Preview
//           </Button>
//           <Button variant="secondary" className="me-2">
//             <FaPencilAlt className="me-2" />
//             Edit
//           </Button>
//           <Button variant="outline-secondary">...</Button>
//         </div>
//       </div>

//       <hr />

//       <div className="quiz-details">
//         <p><strong>Quiz Type:</strong> {quiz.quiz_type || "Graded Quiz"}</p>
//         <p><strong>Points:</strong> {totalPoints !== null ? totalPoints : quiz.total_points || 0}</p>
//         {/* Additional quiz details */}
//       </div>

//       <hr />

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
//             <td>Everyone</td>
//             <td>{new Date(quiz.available_from).toLocaleString()}</td>
//             <td>{new Date(quiz.available_until).toLocaleString()}</td>
//           </tr>
//         </tbody>
//       </Table>

//       <div className="text-center mt-4">
//         <Button variant="danger">Click here To take the Quiz</Button>
//       </div>
//     </div>
//   );
// }

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
