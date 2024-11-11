import { createSlice } from "@reduxjs/toolkit";
import {QuizQuestion} from "../types/QuizQuestion"

const initialState: { quizQuestions: QuizQuestion[] } = { quizQuestions: [] };

//slice for all the questions in the current quiz
const quizQuestionSlice = createSlice(
    {
        name: "quizQuestion",
        initialState,

        reducers: {
            addQuizQuestion: (state, {payload: newQuestion}) => {
                const question = newQuestion as QuizQuestion; //type casting
                state.quizQuestions = [...state.quizQuestions, question];
            },
            removeQuizQuestion: (state, {payload: qID}) => {
                state.quizQuestions = state.quizQuestions.filter(q => q.question_id !== qID);
            },
            editQuizQuestion: (state, {payload: quizQuestion}) => {
                const editedQuestion = quizQuestion as QuizQuestion;
                state.quizQuestions = state.quizQuestions.map((q) => {
                    if (q.question_id === editedQuestion.question_id) {
                        return editedQuestion;
                    }else{
                        return q;
                    }
                })
            }
        }
    }
);

export const {addQuizQuestion, removeQuizQuestion, editQuizQuestion} = quizQuestionSlice.actions;
export default quizQuestionSlice.reducer;