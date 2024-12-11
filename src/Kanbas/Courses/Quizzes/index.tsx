import React from "react";
import ProtectedRole from "../../Account/ProtectedRole";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";





export default function Quizzes() {
    const navigate = useNavigate();
    const { cid } = useParams();
    return (
        //todo: get all quizzes for current course then map to list of quizzes


        //todo: if student clicks on a specific quiz show the quiz details(?) and or quiz preview
        


        <ProtectedRole role="FACULTY">
            <div className="wd-quizzes-container">
                {/* Button to navigate to Quiz Editor */}
                <button
                    onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/QuizEditor`)}
                    className="wd-quiz-editor-button"
                >
                    FACULTY Quiz Editor
                </button>
            </div>
            </ProtectedRole>
        );
    }
    