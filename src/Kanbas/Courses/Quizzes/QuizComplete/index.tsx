import React from "react";
import { useParams, Link } from "react-router-dom";

export default function QuizComplete() {
  const { courseId } = useParams<{ courseId: string }>();

  return (
    <div className="p-4 text-center">
      <h1>Quiz Complete!</h1>
      <p>
        Wow... You actually completed that quiz. Literally actually completed it
        for course ID: {courseId}.
      </p>
      <Link to={`/Kanbas/Courses/${courseId}`} className="btn btn-primary">
        Back to Course
      </Link>
    </div>
  );
}
