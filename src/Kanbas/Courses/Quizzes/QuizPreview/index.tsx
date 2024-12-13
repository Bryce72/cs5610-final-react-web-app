import React, { useEffect } from "react";
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
import { setCurrentUser } from "../../../Account/reducer"; // Import setCurrentUser action
import ProtectedRole from "../../../Account/ProtectedRole";

interface RootState {
  quizPreview: {
    questions: any[];
    currentQuestionIndex: number;
    selectedAnswers: any[];
    currentPoints: number;
    totalPoints: number;
    loading: boolean;
    error: string | null;
    answersChanged: boolean;
    attempts: number;
    maxAttempts: number;
  };
  accountReducer: {
    currentUser: {
      _id: string | null;
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
      dob: string | null;
      section?: string;
      lastActivity?: string;
      totalActivity?: string;
    } | null;
  };
}

export default function QuizPreview() {
  const { courseId, quizId } = useParams<{ courseId: string; quizId: string }>();
  const dispatch = useDispatch();

  // Selectors to get data from the Redux store
  const {
    questions,
    currentQuestionIndex,
    selectedAnswers,
    currentPoints,
    totalPoints,
    loading,
    error,
  } = useSelector((state: RootState) => state.quizPreview);
  const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser);

// Fetch the current user if not already loaded
useEffect(() => {
  const fetchCurrentUser = async () => {
    if (!currentUser) {
      try {
        // Fetch current user from backend
        const fetchedUser = await client.getCurrentUser();
        console.log("Fetched User:", fetchedUser); // Log fetched user
        dispatch(setCurrentUser(fetchedUser)); // Store in Redux
      } catch (error) {
        console.error("Error fetching current user:", error);
        alert("Failed to authenticate. Please log in.");
      }
    } else {
      console.log("Current User from Redux:", currentUser); // Log current user from Redux
    }
  };

  fetchCurrentUser();
}, [dispatch, currentUser]);


  // Fetch quiz questions
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!quizId) {
        console.error("Quiz ID is required but is missing.");
        return;
      }

      try {
        dispatch(setLoading(true));
        const fetchedQuestions = await client.findQuizQuestions(quizId);
        dispatch(setQuestions(fetchedQuestions));
      } catch (error) {
        dispatch(setError("Failed to fetch questions"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchQuestions();
  }, [dispatch, quizId]);

  // Handle quiz submission
  const handleSubmit = async () => {
    if (!currentUser?._id) {
      alert("User not authenticated. Please log in.");
      return;
    }
  
    if (!quizId) {
      alert("Quiz ID is required but is missing.");
      return;
    }
  
    try {
      const quizAttempt = {
        courseID: courseId,
        answers: selectedAnswers,
        score: currentPoints,
        timestamp: new Date().toISOString(),
      };
  
      await client.createQuizAttempt(currentUser._id, quizId, quizAttempt);
      dispatch(resetQuiz());
      alert("Quiz submitted successfully!");
    } catch (error) {
      console.error("Error submitting quiz attempt:", error);
      alert("Failed to submit the quiz. Please try again.");
    }
  };
  

  // Render conditions
  if (loading) return <div className="p-4">Loading questions...</div>;
  if (error) return <div className="p-4 text-danger">{error}</div>;
  if (!questions?.length) return <div className="p-4">No questions available for this quiz</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="wd-main-content-offset p-4">
      <h2 className="mb-4">Quiz Preview</h2>
      <ProtectedRole role="FACULTY">
        <div className="alert alert-info mb-4">
          <span>Score: {currentPoints} / {totalPoints} points</span>
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
        </div>
      </ProtectedRole>

      <div className="row">
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
                  dispatch(selectAnswer({ questionIndex: currentQuestionIndex, answer }));
                }}
                selectedAnswer={selectedAnswers[currentQuestionIndex]}
              />
            </div>
          </div>
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
            <button
              className="btn btn-outline-danger"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-header">Questions</div>
            <div className="list-group list-group-flush">
              {questions.map((_, index) => (
                <button
                  key={index}
                  className={`list-group-item list-group-item-action ${currentQuestionIndex === index ? 'active' : ''}`}
                  onClick={() => dispatch(setQuestionIndex(index))}
                >
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


// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import * as client from "./client";
// import Question from "./question";
// import {
//   nextQuestion,
//   prevQuestion,
//   selectAnswer,
//   resetQuiz,
//   setQuestionIndex,
//   setQuestions,
//   setLoading,
//   setError,
// } from "./reducer";
// import ProtectedRole from "../../../Account/ProtectedRole";


// export default function QuizPreview() {
//   const { courseId, quizId } = useParams(); // Get both courseId and quizId
//   const dispatch = useDispatch();
//   console.log("QuizPreview Params:", { courseId, quizId }); // Debug log

//   const {
//     questions,
//     currentQuestionIndex,
//     selectedAnswers,
//     currentPoints,
//     totalPoints,
//     loading,
//     error,
//   } = useSelector((state: any) => state.quizPreview);

//   const [startTime] = useState(new Date().toLocaleString());
//   const [lastSaveTime, setLastSaveTime] = useState(startTime);
//   const [keepEditing, setKeepEditing] = useState(false);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       if (!quizId) {
//         console.error("No quiz ID provided");
//         return;
//       }

//       try {
//         dispatch(setLoading(true));
//         console.log("Fetching questions for quiz:", quizId); // Debug log
//         const fetchedQuestions = await client.findQuizQuestions(quizId);
//         console.log("Fetched questions:", fetchedQuestions); // Debug log
//         dispatch(setQuestions(fetchedQuestions));
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//         dispatch(setError("Failed to fetch questions"));
//       } finally {
//         dispatch(setLoading(false));
//       }
//     };

//     fetchQuestions();
//   }, [dispatch, quizId]);

//   if (loading) {
//     return <div className="p-4">Loading questions...</div>;
//   }

//   if (error) {
//     return <div className="p-4 text-danger">{error}</div>;
//   }

//   if (!questions?.length) {
//     return <div className="p-4">No questions available for this quiz</div>;
//   }

//   const currentQuestion = questions[currentQuestionIndex];



  

//   return (
//     <div className="wd-main-content-offset p-4">
//       <h2 className="mb-4">Quiz Preview</h2>
      
//       {/* points dont update immediately, only updates when you got o next page */}
//       <ProtectedRole role="FACULTY">
//       {/* Points Display */}
//       <div className="alert alert-info mb-4">
//         <div className="d-flex justify-content-between">
//           <span>Score: {currentPoints} / {totalPoints} points</span>
//           <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
//         </div>
//       </div>
//       </ProtectedRole>

//       <div className="row">
//         {/* Main Quiz Content */}
//         <div className="col-md-9">
//           <div className="card mb-4">
//             <div className="card-header d-flex justify-content-between align-items-center">
//               <span>Question {currentQuestionIndex + 1}</span>
//               <span>{currentQuestion?.points || 0} pts</span>
//             </div>
//             <div className="card-body">
//               <Question
//                 question={currentQuestion.question}
//                 type={currentQuestion.type}
//                 choices={currentQuestion.choices}
//                 points={currentQuestion.points}
//                 onAnswer={(answer) => {
//                   dispatch(selectAnswer({ 
//                     questionIndex: currentQuestionIndex, 
//                     answer 
//                   }));
//                   setLastSaveTime(new Date().toLocaleString());
//                 }}
//                 selectedAnswer={selectedAnswers[currentQuestionIndex]}
//               />
//             </div>
//           </div>

//           {/* Navigation Buttons */}
//           <div className="d-flex justify-content-between mb-4">
//             <button
//               className="btn btn-outline-primary"
//               onClick={() => dispatch(prevQuestion())}
//               disabled={currentQuestionIndex === 0}
//             >
//               Previous
//             </button>
//             <button
//               className="btn btn-outline-primary"
//               onClick={() => dispatch(nextQuestion())}
//               disabled={currentQuestionIndex === questions.length - 1}
//             >
//               Next
//             </button>


//             {/* SUBMIT BUTTON NEEDS FUNCTIONALITY */}
//             <button
//               className="btn btn-outline-danger"
//               onClick={() => dispatch(nextQuestion())}
//               disabled={currentQuestionIndex === questions.length - 1}
//             >
//               Submit
//             </button>
//           </div>
//         </div>

//         {/* Questions List Sidebar */}
//         <div className="col-md-3">
//           <div className="card">
//             <div className="card-header">
//               Questions
//             </div>
//             <div className="list-group list-group-flush">
//               {questions.map((_, index) => (
//                 <button
//                   key={index}
//                   className={`list-group-item list-group-item-action d-flex align-items-center
//                     ${currentQuestionIndex === index ? 'active' : ''}`}
//                   onClick={() => dispatch(setQuestionIndex(index))}
//                 >
//                   <span className="me-2">
//                     {selectedAnswers[index] ? '●' : '○'}
//                   </span>
//                   Question {index + 1}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }