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
    if (quizId === undefined) {
        throw new Error("QuestionEditor: required path param quizId is undefined");
    }

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

    // FIXME: title doesn't show up immediately
    const createNewQuestion = async () => {
        const emptyQuestion = {
            quiz: quizId,
            title: "New Question",
            type: "multiple-choice",
            points: 0
        };
        const newQuestion = client.addQuestion(emptyQuestion, quizId);
        dispatch(addQuizQuestion(newQuestion));
    };


    return (
        <div id="question-editor" className="container mt-4">
            <div id="questions-overview" className="text-center">
                {
                    quizQuestions.map((q: QuizQuestion) => (
                        <QuestionCard question={q} key={q._id} />
                    ))
                }

                <button id="question-editor-new-question"
                    className="btn btn-warning mx-2"
                    onClick={e => createNewQuestion()}
                >
                    + New Question
                </button>

            </div>

            <br />

            {/* QUESTION:  does the cancel and save apply to the ENTIRE quiz or JUST the quiz questions or..? */}
            <div id="question-editor-controls" className="d-flex flex-row border-top mt-3">
                <button id="question-editor-cancel" className="btn btn-outline-danger mx-2 my-3">
                    Cancel
                </button>

                <button id="question-editor-save" className="btn btn-success mx-2 my-3">
                    Save
                </button>
            </div>
        </div>
    );
}