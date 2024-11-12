import { configureStore } from "@reduxjs/toolkit";
import quizzesReducer from "./Quizzes/reducer";

const store = configureStore({
  reducer: {
    quizzesReducer,
  },
});

export default store;
