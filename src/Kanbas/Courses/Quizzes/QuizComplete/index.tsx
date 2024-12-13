import React from "react";
import { useParams, Link } from "react-router-dom";

export default function QuizComplete() {
  const { courseId, quizId } = useParams<{ courseId: string; quizId: string }>();

  return (
    <div className="p-4 text-center">
      <h1>Quiz Complete!</h1>
      <p>
        Wow... You actually completed that quiz for course ID: {courseId} and
        quiz ID: {quizId}.
      </p>
      <Link to={`/Kanbas/Courses/${courseId}`} className="btn btn-primary">
        Back to Course
      </Link>
    </div>
  );
}
