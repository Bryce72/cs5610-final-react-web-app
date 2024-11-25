import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [],
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
