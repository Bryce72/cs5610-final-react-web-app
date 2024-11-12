import { createSlice } from "@reduxjs/toolkit";
import { quizzes } from "../Database";

const initialState = {
  quizzes: quizzes,
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },

    addQuiz: (state, { payload: quiz }) => {
      const newQuiz: any = {
        id: `Q${new Date().getTime().toString().slice(-3)}`, // Generate a unique ID
        course_id: quiz.course_id,
        title: quiz.title,
        description: quiz.description,
        is_published: quiz.is_published || false,
        available_from:
          quiz.available_from || new Date().toISOString().split("T")[0],
        available_until: quiz.available_until || null,
        created_at: new Date().toISOString().split("T")[0],
      };
      state.quizzes = [...state.quizzes, newQuiz] as any;
    },

    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((quiz: any) => quiz.id !== quizId);
    },

    updateQuiz: (state, { payload: updatedQuiz }) => {
      state.quizzes = state.quizzes.map((quiz: any) =>
        quiz.id === updatedQuiz.id ? updatedQuiz : quiz
      );
    },

    editQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.map((quiz: any) =>
        quiz.id === quizId ? { ...quiz, editing: true } : quiz
      );
    },
  },
});

export const { addQuiz, deleteQuiz, updateQuiz, editQuiz, setQuizzes } =
  quizzesSlice.actions;

export default quizzesSlice.reducer;
