import { createSlice } from "@reduxjs/toolkit";
import { questions } from "../Database";

const initialState = {
  questions: questions,
  currentQuestionIndex: 0,
  selectedAnswers: Array(questions.length).fill(null), // Tracks selected answers for each question
  currentPoints: 0, // Tracks the total points scored
  totalPoints: questions.reduce((sum, question) => sum + question.points, 0), // Calculates the total possible points
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    nextQuestion(state) {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      }
    },
    prevQuestion(state) {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },
    selectAnswer(state, action) {
      const { questionIndex, answer } = action.payload;
      state.selectedAnswers[questionIndex] = answer;

      // Update currentPoints only when selecting an answer for the current question
      const currentQuestion = state.questions[questionIndex];

      //FIXME: currentQuestion doesn't have .correct attribute ??
      if (answer === currentQuestion) {
        state.currentPoints += currentQuestion.points;
      }
    },
    resetQuiz(state) {
      state.currentQuestionIndex = 0;
      state.selectedAnswers = Array(state.questions.length).fill(null);
      state.currentPoints = 0;
    },
  },
});

// Export actions and reducer
export const { nextQuestion, prevQuestion, selectAnswer, resetQuiz } =
  questionsSlice.actions;
export default questionsSlice.reducer;
