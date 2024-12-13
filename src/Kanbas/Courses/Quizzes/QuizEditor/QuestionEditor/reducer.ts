import { createSlice } from "@reduxjs/toolkit";
import { QuizQuestion } from "../../types/QuizQuestion";

//starts off empty
const initialState: { quizQuestions: QuizQuestion[] } = { quizQuestions: [] };

//slice for all the questions in the current quiz
const quizQuestionSlice = createSlice(
    {
        name: "quizQuestion",
        initialState,

        reducers: {
            //for when we're using database to get quiz questions
            setQuizQuestions: (state, action) => {
                state.quizQuestions = action.payload;

                // console.log("REDUX setQuizQuestions:");
                // console.debug(`ACTION =${JSON.stringify(action, null, 2)}`);
                // console.debug(`STATE = ${JSON.stringify(state.quizQuestions, null, 2)}`);
            },
            addQuizQuestion: (state, { payload: newQuestion }) => {
                const question = newQuestion as QuizQuestion; //type casting
                state.quizQuestions = [...state.quizQuestions, question];
            },
            removeQuizQuestion: (state, { payload: qID }) => {
                state.quizQuestions = state.quizQuestions.filter(q => q._id !== qID);
            },
            editQuizQuestion: (state, { payload: quizQuestion }) => {
                const editedQuestion = quizQuestion as QuizQuestion;
                state.quizQuestions = state.quizQuestions.map((q) => {
                    if (q._id === editedQuestion._id) {
                        return editedQuestion;
                    } else {
                        return q;
                    }
                })
            }
        }
    }
);

export const { addQuizQuestion, removeQuizQuestion, editQuizQuestion, setQuizQuestions } = quizQuestionSlice.actions;
export default quizQuestionSlice.reducer;