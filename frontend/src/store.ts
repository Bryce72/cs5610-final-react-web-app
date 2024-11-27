import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./app-redux/userReducer";
import quizzesReducer from "./Quizzes/reducer";
import quizDetailReducer from "./QuizDetails/quizDetailReducer";
import quizQuestionsReducer from "./app-redux/quizQuestionReducer";
import questionReducer from "./QuizPreview/reducer";

const store = configureStore({
  reducer: {
    userSlice,
    quizzesReducer,
    quizDetailReducer,
    quizQuestionsReducer,
    questionReducer,
  },
});
export default store;
