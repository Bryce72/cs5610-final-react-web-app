import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { BsGripVertical } from "react-icons/bs";
import * as client from "./client";
import { setQuizzes, deleteQuiz, addQuiz } from "./reducer";
import ProtectedRole from "../../Account/ProtectedRole";
import "./index.css";
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaPlus } from "react-icons/fa";

export default function Quizzes() {
  const { cid } = useParams(); // Fetch the course ID from the URL
  const dispatch = useDispatch();

  // Fetch quizzes for the course
  const fetchQuizzes = async () => {
    if (!cid) return; // Ensure course ID is present
    const quizzes = await client.findQuizzesForCourse(cid); // Pass the course ID dynamically
    dispatch(setQuizzes(quizzes));
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]); // Re-fetch if the course ID changes

  const quizzes = useSelector(
    (state: any) => state.quizzesReducer.quizzes || []
  );

  //fixme
  const newQuiz = async () => {
    if (cid === undefined || typeof cid !== "string") {
      alert("Unable to create new quiz due to invalid course id!");
      return;
    }
    const newQuiz = await client.createQuizForCourse(cid);
    addQuiz(newQuiz); //redux
  };

  const deleteQuiz = async (quizId: string) => {
    if (quizId !== undefined) {
      client.deleteQuiz(quizId);
      deleteQuiz(quizId); //redux
    }
  };

  return (
    <div>
      <ul id="wd-quizzes" className="list-group rounded-0">

        <li className="wd-module list-group-item p-0 mb-4 fs-5 border-lightgray">

          <div className="wd-title p-3 ps-2 bg-light d-flex justify-content-between align-items-center">
            <div>
              <BsGripVertical className="me-2 fs-3" />
              <strong>QUIZZES</strong>

              {/* fixme: someone please make this less ugly */}
              <button className="btn float btn-warning ms-5"
                onClick={e => newQuiz()}>
                New Quiz
              </button>
            </div>
          </div>

          <ul className="wd-lessons list-group rounded-0">
            {quizzes.map((quiz: any) => (
              <li
                key={quiz._id}
                className="wd-lesson list-group-item p-3 ps-1 d-flex align-items-center"
              >
                {/* todo if time: change this to another icon */}
                <BsGripVertical className="me-2 fs-3" />
                <div className="flex-grow-1 ms-2">
                  <h6 className="mb-1">
                    <Link
                      to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}
                      className="text-decoration-none text-dark"
                    >
                      <strong>{quiz.name}</strong>
                    </Link>
                  </h6>
                  <small className="text-muted">
                    <strong>Available:</strong> {quiz.available_from || "TBD"} |{" "}
                    <strong>Due:</strong> {quiz.due || "TBD"} |{" "}
                    {quiz.total_points || 0} pts
                  </small>
                </div>

                <ProtectedRole role="FACULTY">
                  <FaRegTrashAlt className="text-danger"
                    onClick={e => deleteQuiz(quiz._id)} />
                </ProtectedRole>

              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}

// import React from "react";
// import ProtectedRole from "../../Account/ProtectedRole";
// import { useNavigate, useParams } from "react-router-dom";
// import "./index.css";

// export default function Quizzes() {
//     const navigate = useNavigate();
//     const { cid } = useParams();
//     return (


//         <ProtectedRole role="FACULTY">
//             <div className="wd-quizzes-container">
//                 {/* Button to navigate to Quiz Editor */}
//                 <button
//                     onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/QuizEditor`)}
//                     className="wd-quiz-editor-button"
//                 >
//                     FACULTY Quiz Editor
//                 </button>
//             </div>
//             </ProtectedRole>
//         );
//     }
