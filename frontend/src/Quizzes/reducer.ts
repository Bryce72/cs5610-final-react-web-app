import { createSlice } from "@reduxjs/toolkit";
import quizzes from "../Database/quizzes.json";
import QuizDetails from "../Database/quizdetail.json";

const initialState = {
  quizzes: QuizDetails,
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    // Set the quizzes array directly
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },

    // Add a new quiz
    addQuiz: (state, { payload: quiz }) => {
      const newQuiz = {
        quiz_id: `Q${new Date().getTime().toString().slice(-3)}`, // Generate a unique ID
        name: quiz.name,
        quiz_type: quiz.quiz_type || 0,
        total_points: quiz.total_points || 0,
        assignment_group: quiz.assignment_group || 0,
        shuffle_answers: quiz.shuffle_answers || false,
        time_limit_minutes: quiz.time_limit_minutes || null,
        multi_attempts: quiz.multi_attempts || false,
        show_answer: quiz.show_answer || false,
        passcode: quiz.passcode || null,
        questions_one_by_one: quiz.questions_one_by_one || false,
        webcam_required: quiz.webcam_required || false,
        lock_questions: quiz.lock_questions || false,
        due: quiz.due || null,
        available_from: quiz.available_from || new Date().toISOString(),
        available_until: quiz.available_until || null,
        questions: quiz.questions || [],
      };
      state.quizzes = [...state.quizzes, newQuiz];
    },

    // Delete a quiz by its quiz_id
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((quiz) => quiz.quiz_id !== quizId);
    },

    // Update a quiz by its quiz_id
    updateQuiz: (state, { payload: updatedQuiz }) => {
      state.quizzes = state.quizzes.map((quiz) =>
        quiz.quiz_id === updatedQuiz.quiz_id
          ? { ...quiz, ...updatedQuiz }
          : quiz
      );
    },

    // Set a quiz to editing mode (if needed)
    editQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.map((quiz) =>
        quiz.quiz_id === quizId ? { ...quiz, editing: true } : quiz
      );
    },
  },
});

export const { addQuiz, deleteQuiz, updateQuiz, editQuiz, setQuizzes } =
  quizzesSlice.actions;

export default quizzesSlice.reducer;
