import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentReducer from "./Courses/Assignments/reducer";
import enrollmentReducer from "./Enrollments/reducer";
import quizzesReducer from "./Courses/Quizzes/reducer";
import quizDetailReducer from "./Courses/Quizzes/QuizDetails/quizDetailReducer";
import quizQuestions from "./Courses/Quizzes/QuizEditor/QuestionEditor/reducer";

const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentReducer,
    enrollmentReducer,
    quizzesReducer,
    quizDetailReducer,
    quizQuestions
  },
});
export default store;

// push for deployment
