import { createSlice } from "@reduxjs/toolkit";

//TODO: import initial value for the quiz questions?
const initialState = {}

const quizQuestionSlice = createSlice(
    {
        name: "quizQuestion",
        initialState,
        // TODO: add reducers
        reducers: {}
    }
);


//export const { } = quizQuestionSlice.actions;
export default quizQuestionSlice.reducer;