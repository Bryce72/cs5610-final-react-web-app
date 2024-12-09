import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextQuestion, prevQuestion, selectAnswer, resetQuiz } from "./reducer";

export default function QuizComponent() {
  const dispatch = useDispatch();
  const { questions, currentQuestionIndex, currentPoints, totalPoints } =
    useSelector((state: any) => state.questions);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelection = (answer: string) => {
    dispatch(selectAnswer({ questionIndex: currentQuestionIndex, answer }));
  };

  return (
    <div>
      <h1>Quiz</h1>
      <p>Current Points: {currentPoints}</p>
      <p>Total Points: {totalPoints}</p>
      <div className="border p-2">
        <h1 className="wd-question-number border-bottom">
          Question {currentQuestionIndex + 1}
        </h1>
        <div className="p-5">
          <p>{currentQuestion.question}</p>
        </div>
        <ul style={{ listStyle: "none" }}>
          {currentQuestion.answers.map((answer: string, index: number) => (
            <li key={index}>
              <hr />
              <button onClick={() => handleAnswerSelection(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={() => dispatch(prevQuestion())}
        disabled={currentQuestionIndex === 0}
      >
        Prev
      </button>
      <button
        onClick={() => dispatch(nextQuestion())}
        disabled={currentQuestionIndex === questions.length - 1}
      >
        Next
      </button>
      <button onClick={() => dispatch(resetQuiz())}>Reset</button>
    </div>
  );
}
