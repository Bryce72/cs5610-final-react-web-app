import { configureStore } from '@reduxjs/toolkit';
import quizSlice from './quizReducer';
import quizQuestionSlice from './quizQuestionReducer';
import userSlice from './userReducer';

const store = configureStore({
    reducer: {
        quizSlice, quizQuestionSlice, userSlice
    }
})
export default store;