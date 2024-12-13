import React from "react";
import { Link } from "react-router-dom";

export default function QuizComplete() {
  return (
    <div className="p-4 text-center">
      <h1>Quiz Complete!</h1>
      <p>Thank you for completing the quiz. Your responses have been submitted successfully.</p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
}
