import { createSlice } from "@reduxjs/toolkit";

interface Question {
  type: string;
  points: number;
  solution?: any;
}

interface QuizPreviewState {
  questions: Question[];
  currentQuestionIndex: number;
  selectedAnswers: any[];
  currentPoints: number;
  totalPoints: number;
  loading: boolean;
  error: string | null;
  answersChanged: boolean;
  attempts: number;
  maxAttempts: number;
}

// Helper function to check if the answer is correct
const checkAnswer = (questionType: string, userAnswer: any, solution: any) => {
  switch (questionType) {
    case "fill-blanks":
      if (Array.isArray(solution)) {
        return solution.some(
          (correctAnswer) =>
            userAnswer?.toLowerCase() === correctAnswer.toLowerCase()
        );
      }
      return userAnswer?.toLowerCase() === solution?.toLowerCase();
    case "true-false":
      return userAnswer === solution;
    case "multiple-choice":
    default:
      return userAnswer === solution;
  }
};

// Helper function to calculate total points
const calculateTotalPoints = (
  questions: Question[],
  selectedAnswers: any[]
): number => {
  return questions.reduce((total, question, index) => {
    const answer = selectedAnswers[index];
    if (checkAnswer(question.type, answer, question.solution)) {
      return total + (question.points || 0);
    }
    return total;
  }, 0);
};

const initialState: QuizPreviewState = {
  questions: [],
  currentQuestionIndex: 0,
  selectedAnswers: [],
  currentPoints: 0,
  totalPoints: 0,
  loading: false,
  error: null,
  answersChanged: false,
  attempts: 0,
  maxAttempts: 3,
};

const quizPreviewSlice = createSlice({
  name: "quizPreview",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload || []; // Ensure questions is always an array
      state.selectedAnswers = new Array(state.questions.length).fill(null);
      state.totalPoints = state.questions.reduce(
        (sum, q) => sum + (q.points || 0),
        0
      );
      state.currentQuestionIndex = 0; // Reset to first question
      state.currentPoints = 0; // Reset points
      state.answersChanged = false; // Reset changes
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    nextQuestion: (state) => {
      if (state.questions.length > 0 && state.currentQuestionIndex < state.questions.length - 1) {
        if (state.answersChanged) {
          state.currentPoints = calculateTotalPoints(state.questions, state.selectedAnswers);
          state.answersChanged = false;
        }
        state.currentQuestionIndex += 1;
      }
    },
    prevQuestion: (state) => {
      if (state.questions.length > 0 && state.currentQuestionIndex > 0) {
        if (state.answersChanged) {
          state.currentPoints = calculateTotalPoints(state.questions, state.selectedAnswers);
          state.answersChanged = false;
        }
        state.currentQuestionIndex -= 1;
      }
    },
    selectAnswer: (state, action) => {
      const { questionIndex, answer } = action.payload;
      if (state.questions.length > 0 && questionIndex >= 0 && questionIndex < state.questions.length) {
        state.selectedAnswers[questionIndex] = answer;
        state.answersChanged = true;
      } else {
        console.error("Invalid question index for selectAnswer:", questionIndex);
      }
    },
    setQuestionIndex: (state, action) => {
      const index = action.payload;
      if (state.questions.length > 0 && index >= 0 && index < state.questions.length) {
        if (state.answersChanged) {
          state.currentPoints = calculateTotalPoints(state.questions, state.selectedAnswers);
          state.answersChanged = false;
        }
        state.currentQuestionIndex = index;
      } else {
        console.error("Invalid question index for setQuestionIndex:", index);
      }
    },
    resetQuiz: (state) => {
      state.currentQuestionIndex = 0;
      state.selectedAnswers = new Array(state.questions.length).fill(null);
      state.currentPoints = 0;
      state.answersChanged = false;
      state.error = null; // Clear any errors
    },
    calculateCurrentScore: (state) => {
      if (state.answersChanged) {
        state.currentPoints = calculateTotalPoints(state.questions, state.selectedAnswers);
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
        state.error = null; // Clear errors
      } else {
        state.error = "Maximum attempts reached."; // Handle max attempts
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
  submitQuizAttempt,
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
