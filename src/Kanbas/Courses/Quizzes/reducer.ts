import { createSlice } from "@reduxjs/toolkit";

enum QuizType {
  Graded = "Graded Quiz",
  Practice = "Practice Quiz",
  SurveyGraded = "Graded Survey",
  SurveyUngraded = "Ungraded Survey"
}

enum AssignmentGroup {
  Quizzes = "Quizzes",
  Exams = "Exams",
  Assignments = "Assignments",
  Projects = "Projects"
}

const initialState = {
  quizzes: [],
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
      //NOTE: going to trust rest of the code to only send us a quiz that has the required fields with the defaults set correctly
      // const newQuiz = {
      //   name: quiz.name,
      //   quiz_type: quiz.quiz_type || 0,
      //   total_points: quiz.total_points || 0,
      //   assignment_group: quiz.assignment_group || 0,
      //   shuffle_answers: quiz.shuffle_answers || false,
      //   time_limit_minutes: quiz.time_limit_minutes || null,
      //   multi_attempts: quiz.multi_attempts || false,
      //   show_answer: quiz.show_answer || false,
      //   passcode: quiz.passcode || null,
      //   questions_one_by_one: quiz.questions_one_by_one || false,
      //   webcam_required: quiz.webcam_required || false,
      //   lock_questions: quiz.lock_questions || false,
      //   due: quiz.due || null,
      //   available_from: quiz.available_from || new Date().toISOString(),
      //   available_until: quiz.available_until || null,
      //   questions: quiz.questions || [],
      // };
      state.quizzes = [...state.quizzes, quiz] as any;
    },

    // Delete a quiz by its quiz_id
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter(
        (quiz: any) => quiz.quiz_id !== quizId
      );
    },

    // Update a quiz by its quiz_id
    updateQuiz: (state, { payload: updatedQuiz }) => {
      state.quizzes = state.quizzes.map((quiz: any) =>
        quiz.quiz_id === updatedQuiz.quiz_id
          ? { ...quiz, ...updatedQuiz }
          : quiz
      ) as any;
    },

    // Set a quiz to editing mode (if needed)
    editQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.map((quiz: any) =>
        quiz.quiz_id === quizId ? { ...quiz, editing: true } : quiz
      ) as any;
    },
  },
});

export const { addQuiz, deleteQuiz, updateQuiz, editQuiz, setQuizzes } =
  quizzesSlice.actions;

export default quizzesSlice.reducer;
