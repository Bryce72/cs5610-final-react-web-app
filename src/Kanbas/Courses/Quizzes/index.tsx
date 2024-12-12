import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { BsGripVertical } from "react-icons/bs";
import * as client from "./client";
import { setQuizzes } from "./reducer";
import ProtectedRole from "../../Account/ProtectedRole";
import "./index.css";

export default function Quizzes() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch quizzes for the course
  const fetchQuizzes = async () => {
    if (!cid) return;
    const quizzes = await client.findQuizzesForCourse(cid);
    dispatch(setQuizzes(quizzes));
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  const quizzes = useSelector(
    (state: any) => state.quizzesReducer.quizzes || []
  );
<<<<<<< HEAD

  const handleQuizClick = (quizId: string) => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/QuizPreview`);
  };
=======
  const navigate = useNavigate();
>>>>>>> 9d372dc2c33df6d488cec73e2084679697e6aad2
  return (
    <div>
      <ProtectedRole role="FACULTY">
        <div className="wd-quizzes-container">
<<<<<<< HEAD
=======
          {/* Button to navigate to Quiz Editor */}
>>>>>>> 9d372dc2c33df6d488cec73e2084679697e6aad2
          <button
            onClick={() =>
              navigate(`/Kanbas/Courses/${cid}/Quizzes/QuizEditor`)
            }
            className="wd-quiz-editor-button"
          >
            FACULTY Quiz Editor
          </button>
        </div>
      </ProtectedRole>
<<<<<<< HEAD

=======
>>>>>>> 9d372dc2c33df6d488cec73e2084679697e6aad2
      <ul id="wd-quizzes" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-4 fs-5 border-lightgray">
          <div className="wd-title p-3 ps-2 bg-light d-flex justify-content-between align-items-center">
            <div>
              <BsGripVertical className="me-2 fs-3" />
              <strong>QUIZZES</strong>
            </div>
          </div>

          <ul className="wd-lessons list-group rounded-0">
            {quizzes.map((quiz: any) => (
              <li
                key={quiz._id}
                className="wd-lesson list-group-item p-3 ps-1 d-flex align-items-center"
              >
                <BsGripVertical className="me-2 fs-3" />
                <div
                  className="flex-grow-1 ms-2 cursor-pointer"
                  onClick={() => handleQuizClick(quiz._id)}
                  style={{ cursor: "pointer" }}
                >
                  <h6 className="mb-1">
                    <strong>{quiz.name}</strong>
                  </h6>
                  <small className="text-muted">
                    <strong>Available:</strong> {quiz.available_from || "TBD"} |{" "}
                    <strong>Due:</strong> {quiz.due || "TBD"} |{" "}
                    {quiz.total_points || 0} pts
                  </small>
                </div>
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
//         //todo: get all quizzes for current course then map to list of quizzes

//         //todo: if student clicks on a specific quiz show the quiz details(?) and or quiz preview

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
