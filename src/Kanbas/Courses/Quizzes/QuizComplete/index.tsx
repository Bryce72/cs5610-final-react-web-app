import React from "react";
import { Link } from "react-router-dom";

export default function QuizComplete() {
  return (
    <div className="p-4 text-center">
      <h1>Quiz Complete!</h1>
      <p>Wow... You actually completed that quiz. Literally actually completed it.</p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
}
