import { createSlice } from "@reduxjs/toolkit";

// Helper function to check if answers are correct
const checkAnswers = (questionType: string, userAnswer: any, solution: any) => {
  switch (questionType) {
    case "fill-blanks":
      if (Array.isArray(solution) && Array.isArray(userAnswer)) {
        // All answers must be correct to get points
        return solution.every(
          (sol, index) => userAnswer[index]?.toLowerCase() === sol.toLowerCase()
        );
      }
      return false;

    case "true-false":
      return userAnswer === solution;

    case "multiple-choice":
    default:
      return userAnswer === solution;
  }
};

// Helper function to calculate total points
const calculateTotalPoints = (questions: any[], selectedAnswers: any[]) => {
  return questions.reduce((total, question, index) => {
    const answer = selectedAnswers[index];
    if (checkAnswers(question.type, answer, question.solution)) {
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
    selectedAnswers: [],
    currentPoints: 0,
    totalPoints: 0,
    loading: false,
    error: null,
    answersChanged: false,
  },
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
      // Initialize selectedAnswers based on question type
      state.selectedAnswers = action.payload.map((q: any) =>
        q.type === "fill-blanks" && Array.isArray(q.solution)
          ? new Array(q.solution.length).fill("")
          : null
      );
      state.totalPoints = action.payload.reduce(
        (sum: number, q: any) => sum + q.points,
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
      state.selectedAnswers = state.questions.map((q: any) =>
        q.type === "fill-blanks" && Array.isArray(q.solution)
          ? new Array(q.solution.length).fill("")
          : null
      );
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
} = quizPreviewSlice.actions;

export default quizPreviewSlice.reducer;
