import { createSlice } from "@reduxjs/toolkit";
import { QuizDetails } from "../../../Database";

const initialState = {
  quizzes: QuizDetails,
};
const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, { payload: quiz }) => {
      state.quizzes = [...state.quizzes, quiz] as any;
    },
  },
});
export const { setQuizzes, addQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;
