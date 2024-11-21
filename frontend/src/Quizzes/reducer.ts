import { createSlice } from "@reduxjs/toolkit";
import quizzes from "../Database/quizzes.json";

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
        due_date: quiz.due_date || null,

        // Additional fields based on your JSON structure
        type: quiz.type || "hello",
        points: quiz.points || 0,
        assignment_group: quiz.assignment_group || "Assignments",
        shuffle: quiz.shuffle || false,
        multiple_attempts: quiz.multiple_attempts || false,
        time_limit: quiz.time_limit || null,
        show_correct_answers: quiz.show_correct_answers || false,
        one_question_at_a_time: quiz.one_question_at_a_time || false,
        assign_to: quiz.assign_to || [],
      };
      state.quizzes = [...state.quizzes, newQuiz] as any;
    },

    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((quiz: any) => quiz.id !== quizId);
    },

    updateQuiz: (state, { payload: updatedQuiz }) => {
      state.quizzes = state.quizzes.map((quiz: any) =>
        quiz.id === updatedQuiz.id ? { ...quiz, ...updatedQuiz } : quiz
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
