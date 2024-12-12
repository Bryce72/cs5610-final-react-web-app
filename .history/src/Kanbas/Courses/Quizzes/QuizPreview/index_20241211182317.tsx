import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as client from "./client";
import Question from "./question";
import {
  nextQuestion,
  prevQuestion,
  selectAnswer,
  resetQuiz,
  setQuestionIndex,
  setQuestions,
  setLoading,
  setError,
} from "./reducer";

export default function QuizPreview() {
  const { courseId, quizId } = useParams(); // Get both courseId and quizId
  const dispatch = useDispatch();
  console.log("QuizPreview Params:", { courseId, quizId }); // Debug log

  const {
    questions,
    currentQuestionIndex,
    selectedAnswers,
    currentPoints,
    totalPoints,
    loading,
    error,
  } = useSelector((state: any) => state.quizPreview);

  const [startTime] = useState(new Date().toLocaleString());
  const [lastSaveTime, setLastSaveTime] = useState(startTime);
  const [keepEditing, setKeepEditing] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!quizId) {
        console.error("No quiz ID provided");
        return;
      }

      try {
        dispatch(setLoading(true));
        console.log("Fetching questions for quiz:", quizId); // Debug log
        const fetchedQuestions = await client.findQuizQuestions(quizId);
        console.log("Fetched questions:", fetchedQuestions); // Debug log
        dispatch(setQuestions(fetchedQuestions));
      } catch (error) {
        console.error("Error fetching questions:", error);
        dispatch(setError("Failed to fetch questions"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchQuestions();
  }, [dispatch, quizId]);

  if (loading) {
    return <div className="p-4">Loading questions...</div>;
  }

  if (error) {
    return <div className="p-4 text-danger">{error}</div>;
  }

  if (!questions?.length) {
    return <div className="p-4">No questions available for this quiz</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="wd-main-content-offset p-4">
      <h2 className="mb-4">Quiz Preview</h2>
      
      {/* Points Display */}
      <div className="alert alert-info mb-4">
        <div className="d-flex justify-content-between">
          <span>Score: {currentPoints} / {totalPoints} points</span>
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
        </div>
      </div>

      <div className="row">
        {/* Main Quiz Content */}
        <div className="col-md-9">
          <div className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <span>Question {currentQuestionIndex + 1}</span>
              <span>{currentQuestion?.points || 0} pts</span>
            </div>
            <div className="card-body">
              <Question
                question={currentQuestion.question}
                type={currentQuestion.type}
                choices={currentQuestion.choices}
                points={currentQuestion.points}
                onAnswer={(answer) => {
                  dispatch(selectAnswer({ 
                    questionIndex: currentQuestionIndex, 
                    answer 
                  }));
                  setLastSaveTime(new Date().toLocaleString());
                }}
                selectedAnswer={selectedAnswers[currentQuestionIndex]}
              />
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="d-flex justify-content-between mb-4">
            <button
              className="btn btn-outline-primary"
              onClick={() => dispatch(prevQuestion())}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => dispatch(nextQuestion())}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              Next
            </button>
          </div>
        </div>

        {/* Questions List Sidebar */}
        <div className="col-md-3">
          <div className="card">
            <div className="card-header">
              Questions
            </div>
            <div className="list-group list-group-flush">
              {questions.map((_, index) => (
                <button
                  key={index}
                  className={`list-group-item list-group-item-action d-flex align-items-center
                    ${currentQuestionIndex === index ? 'active' : ''}`}
                  onClick={() => dispatch(setQuestionIndex(index))}
                >
                  <span className="me-2">
                    {selectedAnswers[index] ? '●' : '○'}
                  </span>
                  Question {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}