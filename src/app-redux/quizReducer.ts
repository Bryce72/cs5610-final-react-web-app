import { createSlice } from "@reduxjs/toolkit";

//TODO: import initial value for the quiz
const initialState = {}

const quizSlice = createSlice(
    {
        name: "quiz",
        initialState,
        // TODO: add reducers
        reducers: {}
    }
);


export const { } = quizSlice.actions;
export default quizSlice.reducer;