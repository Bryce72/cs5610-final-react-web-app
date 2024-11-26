import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./app-redux/userReducer";
import quizSlice from "./app-redux/quizReducer";
import quizzesReducer from "./Quizzes/reducer";
import quizDetailReducer from "./QuizDetails/quizDetailReducer";
import quizQuestionsReducer from "./app-redux/quizQuestionReducer";
import questionReducer from "./QuizPreview/reducer";

const store = configureStore({
  reducer: {
    userSlice,
    quizSlice,
    quizzesReducer,
    quizDetailReducer,
    quizQuestionsReducer,
    questions: questionReducer,
  },
});
export default store;
