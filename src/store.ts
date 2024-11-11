import { configureStore } from '@reduxjs/toolkit';
import quizSlice from './app-redux/quizReducer';
import quizQuestionSlice from './app-redux/quizQuestionReducer';
import userSlice from './app-redux/userReducer';

const store = configureStore({
    reducer: {
        quizSlice, quizQuestionSlice, userSlice
    }
})
export default store;