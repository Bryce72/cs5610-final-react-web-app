import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import QuestionCard from "./QuestionCard";
import { QuizQuestion } from "../../types/QuizQuestion";
import React from "react";
import * as client from './client';
import { setQuizQuestions, addQuizQuestion, removeQuizQuestion, editQuizQuestion } from "./reducer";
import { useParams } from "react-router-dom";

export default function QuestionEditor() {

    const dispatch = useDispatch();
    const { quizId } = useParams<{ quizId: string }>();

    //REDUX for all questions in the current quiz
    const { quizQuestions } = useSelector((state: any) => state.quizQuestions);

    const fetchQuestions = async (quizID: string) => {
        //get questions for this quiz from the server
        const serverQuestions = await client.getQuestionsForQuiz(quizID);
        //update redux
        dispatch(setQuizQuestions(serverQuestions));
    };

    // when page first loads get all the questions for this quiz
    useEffect(() => {
        if (typeof quizId !== "string") {
            throw new TypeError(`'quizId' should be a string but is actually ${typeof quizId}`)
        } else {
            fetchQuestions(quizId);
        }
    }, []);

    //testing: effect to log whenever our questions change
    useEffect(() => {
        console.log(`QuestionEditor\n${JSON.stringify(quizQuestions, null, 2)}`);
    }, [quizQuestions]);


    return (
        <div id="question-editor" className="container mt-4">
            <div id="questions-overview" className="text-center">
                {
                    // FIXME: .map is not a function??
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