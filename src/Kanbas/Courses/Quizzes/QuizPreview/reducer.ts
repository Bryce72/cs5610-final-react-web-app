import { createSlice } from "@reduxjs/toolkit";

// Helper function to check if answer is correct
const checkAnswer = (questionType, userAnswer, solution) => {
  switch (questionType) {
    case "fill-blanks":
      if (Array.isArray(solution)) {
        return solution.some(
          (correctAnswer) =>
            userAnswer?.toLowerCase() === correctAnswer.toLowerCase()
        );
      }
      return userAnswer?.toLowerCase() === solution.toLowerCase();
    case "true-false":
      return userAnswer === solution;
    case "multiple-choice":
    default:
      return userAnswer === solution;
  }
};

// Helper function to calculate total points
const calculateTotalPoints = (questions, selectedAnswers) => {
  return questions.reduce((total, question, index) => {
    const answer = selectedAnswers[index];
    if (checkAnswer(question.type, answer, question.solution)) {
      return total + question.points;
    }
    return total;
  }, 0);
};

const quizPreviewSlice = createSlice({
  name: "quizPreview",
  initialState: {
    questions: [],
    currentQuestionIndex: 0,
    selectedAnswers: [] as any[], // Explicitly define type for selectedAnswers
    currentPoints: 0,
    totalPoints: 0,
    loading: false,
    error: null as string | null,
    answersChanged: false,
    attempts: 0, // New field to track attempts
    maxAttempts: 3, // Maximum allowed attempts
  },
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
      state.selectedAnswers = new Array(action.payload.length).fill(null);
      state.totalPoints = action.payload.reduce(
        (sum, q) => sum + q.points,
        0
      );
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        if (state.answersChanged) {
          state.currentPoints = calculateTotalPoints(
            state.questions,
            state.selectedAnswers
          );
          state.answersChanged = false;
        }
        state.currentQuestionIndex += 1;
      }
    },
    prevQuestion: (state) => {
      if (state.currentQuestionIndex > 0) {
        if (state.answersChanged) {
          state.currentPoints = calculateTotalPoints(
            state.questions,
            state.selectedAnswers
          );
          state.answersChanged = false;
        }
        state.currentQuestionIndex -= 1;
      }
    },
    selectAnswer: (state, action) => {
      const { questionIndex, answer } = action.payload;
      state.selectedAnswers[questionIndex] = answer;
      state.answersChanged = true;
    },
    setQuestionIndex: (state, action) => {
      if (state.answersChanged) {
        state.currentPoints = calculateTotalPoints(
          state.questions,
          state.selectedAnswers
        );
        state.answersChanged = false;
      }
      state.currentQuestionIndex = action.payload;
    },
    resetQuiz: (state) => {
      state.currentQuestionIndex = 0;
      state.selectedAnswers = new Array(state.questions.length).fill(null);
      state.currentPoints = 0;
      state.answersChanged = false;
    },
    calculateCurrentScore: (state) => {
      if (state.answersChanged) {
        state.currentPoints = calculateTotalPoints(
          state.questions,
          state.selectedAnswers
        );
        state.answersChanged = false;
      }
    },
    submitQuizAttempt: (state) => {
      if (state.attempts < state.maxAttempts) {
        state.attempts += 1; // Increment attempts
        state.answersChanged = false; // Reset changes
        state.currentQuestionIndex = 0; // Reset quiz state
        state.currentPoints = 0;
        state.selectedAnswers = new Array(state.questions.length).fill(null);
      } else {
        state.error = "Maximum attempts reached."; // Handle case where attempts exceed max
      }
    },
  },
});

export const {
  setQuestions,
  setLoading,
  setError,
  nextQuestion,
  prevQuestion,
  selectAnswer,
  setQuestionIndex,
  resetQuiz,
  calculateCurrentScore,
  submitQuizAttempt, // Export the new action
} = quizPreviewSlice.actions;

export default quizPreviewSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// // Helper function to check if answer is correct
// const checkAnswer = (questionType: string, userAnswer: any, solution: any) => {
//   switch (questionType) {
//     case "fill-blanks":
//       // For fill-blanks, check if the answer matches any of the correct answers
//       if (Array.isArray(solution)) {
//         return solution.some(
//           (correctAnswer) =>
//             userAnswer?.toLowerCase() === correctAnswer.toLowerCase()
//         );
//       }
//       return userAnswer?.toLowerCase() === solution.toLowerCase();

//     case "true-false":
//       return userAnswer === solution;

//     case "multiple-choice":
//     default:
//       return userAnswer === solution;
//   }
// };

// // Helper function to calculate total points
// const calculateTotalPoints = (questions: any[], selectedAnswers: any[]) => {
//   return questions.reduce((total, question, index) => {
//     const answer = selectedAnswers[index];
//     if (checkAnswer(question.type, answer, question.solution)) {
//       return total + question.points;
//     }
//     return total;
//   }, 0);
// };

// const quizPreviewSlice = createSlice({
//   name: "quizPreview",
//   initialState: {
//     questions: [],
//     currentQuestionIndex: 0,
//     selectedAnswers: [] as any[],
//     currentPoints: 0,
//     totalPoints: 0,
//     loading: false,
//     error: null,
//     answersChanged: false,
//   },
//   reducers: {
//     setQuestions: (state, action) => {
//       state.questions = action.payload;
//       state.selectedAnswers = new Array(action.payload.length).fill(null);
//       state.totalPoints = action.payload.reduce(
//         (sum: number, q: any) => sum + q.points,
//         0
//       );
//     },
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//     },
//     nextQuestion: (state) => {
//       if (state.currentQuestionIndex < state.questions.length - 1) {
//         if (state.answersChanged) {
//           state.currentPoints = calculateTotalPoints(
//             state.questions,
//             state.selectedAnswers
//           );
//           state.answersChanged = false;
//         }
//         state.currentQuestionIndex += 1;
//       }
//     },
//     prevQuestion: (state) => {
//       if (state.currentQuestionIndex > 0) {
//         if (state.answersChanged) {
//           state.currentPoints = calculateTotalPoints(
//             state.questions,
//             state.selectedAnswers
//           );
//           state.answersChanged = false;
//         }
//         state.currentQuestionIndex -= 1;
//       }
//     },
//     selectAnswer: (state, action) => {
//       const { questionIndex, answer } = action.payload;
//       state.selectedAnswers[questionIndex] = answer;
//       state.answersChanged = true;
//     },
//     setQuestionIndex: (state, action) => {
//       if (state.answersChanged) {
//         state.currentPoints = calculateTotalPoints(
//           state.questions,
//           state.selectedAnswers
//         );
//         state.answersChanged = false;
//       }
//       state.currentQuestionIndex = action.payload;
//     },
//     resetQuiz: (state) => {
//       state.currentQuestionIndex = 0;
//       state.selectedAnswers = new Array(state.questions.length).fill(null);
//       state.currentPoints = 0;
//       state.answersChanged = false;
//     },
//     calculateCurrentScore: (state) => {
//       if (state.answersChanged) {
//         state.currentPoints = calculateTotalPoints(
//           state.questions,
//           state.selectedAnswers
//         );
//         state.answersChanged = false;
//       }
//     },
//   },
// });

// export const {
//   setQuestions,
//   setLoading,
//   setError,
//   nextQuestion,
//   prevQuestion,
//   selectAnswer,
//   setQuestionIndex,
//   resetQuiz,
//   calculateCurrentScore,
// } = quizPreviewSlice.actions;

// export default quizPreviewSlice.reducer;
