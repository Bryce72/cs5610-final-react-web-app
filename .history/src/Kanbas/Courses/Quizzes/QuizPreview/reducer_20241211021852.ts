import { createSlice } from "@reduxjs/toolkit";

// Dummy questions for testing
const dummyQuestions = [
  {
    id: 1,
    question:
      "An HTML label element can be associated with an HTML input element by setting their id attributes to the same value. The resulting effect is that when you click on the label text, the input element receives focus as if you had clicked on the input element itself.",
    answers: ["True", "False"],
    correct: "True",
    points: 1,
  },
  {
    id: 2,
    question: "Which HTML tag is used to define an unordered list?",
    answers: ["<ul>", "<ol>", "<li>", "<list>"],
    correct: "<ul>",
    points: 2,
  },
  {
    id: 3,
    question: "What does CSS stand for?",
    answers: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style Sheets",
      "Colorful Style Sheets",
    ],
    correct: "Cascading Style Sheets",
    points: 2,
  },
];

const initialState = {
  questions: dummyQuestions,
  currentQuestionIndex: 0,
  selectedAnswers: Array(dummyQuestions.length).fill(null),
  currentPoints: 0,
  totalPoints: dummyQuestions.reduce(
    (sum, question) => sum + question.points,
    0
  ),
};

const quizPreviewSlice = createSlice({
  name: "quizPreview",
  initialState,
  reducers: {
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
    },
    resetQuiz: (state) => {
      state.currentQuestionIndex = 0;
      state.selectedAnswers = Array(state.questions.length).fill(null);
      state.currentPoints = 0;
    },
    setQuestionIndex: (state, action) => {
      state.currentQuestionIndex = action.payload;
    },
  },
});

export const {
  nextQuestion,
  prevQuestion,
  selectAnswer,
  resetQuiz,
  setQuestionIndex,
} = quizPreviewSlice.actions;

export default quizPreviewSlice.reducer;
