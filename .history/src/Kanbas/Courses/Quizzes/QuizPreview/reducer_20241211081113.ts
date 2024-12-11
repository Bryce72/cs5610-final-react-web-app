// reducer.ts
import { createSlice } from "@reduxjs/toolkit";

interface QuizState {
  questions: any[];
  currentQuestionIndex: number;
  selectedAnswers: (string | boolean | null)[];
  currentPoints: number;
  totalPoints: number;
  loading: boolean;
  error: string | null;
  answersChanged: boolean; // New flag to track if answers changed
}

const initialState: QuizState = {
  questions: [],
  currentQuestionIndex: 0,
  selectedAnswers: [],
  currentPoints: 0,
  totalPoints: 0,
  loading: false,
  error: null,
  answersChanged: false,
};

// Helper function to calculate points for all questions
const calculateTotalPoints = (
  questions: any[],
  selectedAnswers: (string | boolean | null)[]
) => {
  return questions.reduce((total, question, index) => {
    const answer = selectedAnswers[index];
    if (answer === question.solution) {
      return total + question.points;
    }
    return total;
  }, 0);
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
      state.currentPoints = 0;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        // Calculate points if answers have changed
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
        // Calculate points if answers have changed
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
      state.answersChanged = true; // Mark that answers have changed
    },
    setQuestionIndex: (state, action) => {
      // Calculate points if answers have changed before changing question
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
    // New action to force score calculation
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
