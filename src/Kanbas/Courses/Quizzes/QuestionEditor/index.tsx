import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import QuestionCard from "./QuestionCard";
import { QuizQuestion } from "../types/QuizQuestion";
import React from "react";

export default function QuestionEditor() {
    const dispatch = useDispatch();

    //todo: get id for current quiz from path params

    //REDUX for all questions in the current quiz
    //todo: filter this for current quiz only
    const { quizQuestions } = useSelector((state: any) => state.quizQuestions);

    return (
        <div id="question-editor" className="container mt-4">
            <div id="questions-overview" className="text-center">
                {
                    quizQuestions.map((q: QuizQuestion) => (
                        <QuestionCard question={q} key={q.question_id} />
                    ))
                }

                {/* TODO: onclick add a new empty question right above this button */}
                <button id="question-editor-new-question" className="btn btn-warning mx-2">
                    + New Question
                </button>

            </div>

            <br />

            {/* very bottom of my page to save all changes to all the questions */}
            <div id="question-editor-controls" className="d-flex flex-row border-top mt-3">
                <button id="question-editor-cancel" className="btn btn-outline-danger mx-2 my-3">
                    Cancel
                </button>

                {/* QUESTION:  does this save changes to questions only or does it save changes to the entire quiz?*/}
                <button id="question-editor-save" className="btn btn-success mx-2 my-3">
                    Save
                </button>
            </div>
        </div>
    );
}