import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import quizzes from "../Database/quizdetail.json";
import { Quiz } from "../types/Quiz";

// Initial state for the quiz slice
const initialState: Quiz[] = [];

// Create a slice for quizzes
const quizSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action: PayloadAction<Quiz[]>) => action.payload,
    addQuiz: (state, action: PayloadAction<Quiz>) => {
      state.push(action.payload);
    },
  },
});

export const { setQuizzes, addQuiz } = quizSlice.actions;
export default quizSlice.reducer;

// Thunk to load quizzes from the JSON file
export const loadQuizzes = () => async (dispatch: any) => {
  try {
    // Ensure quizzes data is defined and is an array
    if (!Array.isArray(quizzes)) {
      console.error("Quizzes data is not an array or not defined");
      return;
    }

    // Map through the quizzes and parse dates
    const parsedQuizzes = quizzes.map((quiz) => ({
      ...quiz,
      due: quiz.due ? new Date(quiz.due) : new Date(NaN), // Invalid date if not present
      available_from: quiz.available_from
        ? new Date(quiz.available_from)
        : new Date(NaN),
      available_until: quiz.available_until
        ? new Date(quiz.available_until)
        : new Date(NaN),
    }));
    dispatch(setQuizzes(parsedQuizzes));
  } catch (error) {
    console.error("Failed to load quizzes:", error);
  }
};
