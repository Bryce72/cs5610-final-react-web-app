import FillBlanksEditor from "./FillBlanksEditor";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import QuestionBasicsEditor from "./QuestionBasicsEditor";
import TrueFalseEditor from "./TrueFalseEditor";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { QuizQuestion } from "../types/QuizQuestion";
import { useState } from "react";



export default function QuestionEditor() {
    const dispatch = useDispatch();

    //REDUX for all questions in the current quiz
    const { questions } = useSelector((state: any) => state.quizQuestionsReducer);

    //local state for question we're currently editing
    const [currQuestion, setCurrQuestion] = useState<QuizQuestion>();

    return (
        <div id="question-editor" className="container mt-4" >

            <div id="questions-overview" className="text-center">

                {questions.map((q: QuizQuestion) => {
                    //TODO: question preview card, with buttons to edit or delete
                    return (
                        <div>
                            <p>{q.title}</p>
                        </div>
                    );
                })}

                <button id="question-editor-new-question" className="btn btn-light border-secondary mx-2 ">
                    {/* TODO: onClick triggers new question being created and visibility of question-editor */}
                    + New Question
                </button>

            </div>

            <br />
            {/* TODO: only show this when we've chosen to edit a question or make a new question */}
            <div id="question-editor">
                <QuestionBasicsEditor />

                <Routes>
                    <Route path="/fill-blanks" element={<FillBlanksEditor />}></Route>
                    <Route path="/true-false" element={<TrueFalseEditor />}></Route>
                    <Route path="/multiple-choice" element={<MultipleChoiceEditor />}></Route>
                </Routes>
            </div>

            {/* TODO: add functionality to buttons */}
            <div id="question-editor-controls" className="d-flex flex-row border-top mt-3">
                <button id="question-editor-cancel" className="btn btn-light border-secondary mx-2 my-3">
                    Cancel
                </button>

                <button id="question-editor-save" className="btn btn-danger mx-2 my-3">
                    Save
                </button>
            </div>
        </div>
    );
}