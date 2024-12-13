import React from "react";
import { useParams, Link } from "react-router-dom";

export default function QuizComplete() {
  const { quizId } = useParams<{ quizId: string }>();

  return (
    <div className="p-4 text-center">
      <h1>Quiz Complete!</h1>
      <p>
        Wow... You actually completed that quiz for quiz ID: {quizId}.
      </p>
      <Link to="/Kanbas/Courses" className="btn btn-primary">
        Back to Courses
      </Link>
    </div>
  );
}