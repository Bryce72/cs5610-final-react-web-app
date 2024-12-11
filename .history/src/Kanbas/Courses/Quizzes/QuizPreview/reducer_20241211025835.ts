import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  selectedAnswers: [],
  currentPoints: 0,
  totalPoints: 0,
  loading: false,
  error: null,
};

const quizPreviewSlice = createSlice({
  name: "quizPreview",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
      state.selectedAnswers = new Array(action.payload.length).fill(null);
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
        state.currentQuestionIndex += 1;
      }
    },
    prevQuestion: (state) => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },
    selectAnswer: (state, action) => {
      const { questionIndex, answer } = action.payload;
      state.selectedAnswers[questionIndex] = answer;
      // Update points if the answer is correct
      const question = state.questions[questionIndex];
      if (answer === question.solution) {
        state.currentPoints += question.points;
      }
    },
    setQuestionIndex: (state, action) => {
      state.currentQuestionIndex = action.payload;
    },
    resetQuiz: (state) => {
      state.currentQuestionIndex = 0;
      state.selectedAnswers = new Array(state.questions.length).fill(null);
      state.currentPoints = 0;
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
} = quizPreviewSlice.actions;

export default quizPreviewSlice.reducer;
