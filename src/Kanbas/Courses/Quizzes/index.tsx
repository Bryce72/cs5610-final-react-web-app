import React from "react";
import QuizEditor from "./QuizEditor";
import ProtectedRole from "../../Account/ProtectedRole";
import { useNavigate } from "react-router-dom";





export default function Quizzes() {
    const navigate = useNavigate();
    return (
        //todo: get all quizzes for current course then map to list of quizzes


        //todo: if student clicks on a specific quiz show the quiz details(?) and or quiz preview
        
            <div className="wd-quizzes-container">
                {/* Button to navigate to Quiz Editor */}
                <button
                    onClick={() => navigate("/quiz-editor")}
                    className="wd-quiz-editor-button"
                >
                    FACULTY Quiz Editor
                </button>
    
                {/* Protected role content */}
                <ProtectedRole role="FACULTY">
                    <QuizEditor />
                </ProtectedRole>
            </div>
        );
    }
    