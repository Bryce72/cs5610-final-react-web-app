import { configureStore } from "@reduxjs/toolkit";
import quizSlice from "./app-redux/quizReducer";
import quizQuestionSlice from "./app-redux/quizQuestionReducer";
import userSlice from "./app-redux/userReducer";
import quizzesReducer from "./Quizzes/reducer";
import questionReducer from "./QuizPreview/reducer";

const store = configureStore({
  reducer: {
    quizSlice,
    quizQuestionSlice,
    userSlice,
    quizzesReducer,
    questions: questionReducer,
  },
});
export default store;
