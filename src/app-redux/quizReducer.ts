import {createSlice} from "@reduxjs/toolkit";
import {AssignmentGroup, Quiz, QuizType} from "../types/Quiz";

//new quiz with default values
const initialState: Quiz = {
    quiz_id: new Date().getTime().toString(),
    name: "",
    quiz_type: QuizType.Graded,
    total_points: 0,
    assignment_group: AssignmentGroup.Quizzes,
    shuffle_answers: true,
    time_limit_minutes: 20,
    multi_attempts: false,
    show_answer: false,
    passcode: null,
    questions_one_by_one: true,
    webcam_required: false,
    lock_questions: false,
    due: new Date(),
    available_from: new Date(),
    available_until: new Date(),
    questions: [],
}

const quizSlice = createSlice(
    {
        name: "quiz",
        initialState,
        reducers: {
            //FIXME: this is just a basic draft
            updateQuiz: (state, {payload: updatedQuiz}) => {
                state = updatedQuiz as Quiz;
            }
        }
    }
);

//export const { } = quizSlice.actions;
export default quizSlice.reducer;