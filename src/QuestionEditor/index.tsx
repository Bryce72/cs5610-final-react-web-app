import FillBlanksEditor from "./FillBlanksEditor";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import QuestionBasicsEditor from "./QuestionBasicsEditor";
import TrueFalseEditor from "./TrueFalseEditor";
import { Routes, Route } from "react-router-dom";


export default function QuestionEditor() {
    return (
        <div id="question-editor" className="container mt-4" >
            <div id="question-editor-main" className="text-center">
                <button id="question-editor-new-question" className="btn btn-light border-secondary mx-2 ">
                    + New Question
                </button>
            </div>

            <br />
            <QuestionBasicsEditor />

            <Routes>
                <Route path="/fill-blanks" element={<FillBlanksEditor />}></Route>
                <Route path="/true-false" element={<TrueFalseEditor />}></Route>
                <Route path="/multiple-choice" element={<MultipleChoiceEditor />}></Route>
            </Routes>

            <div id="question-editor-controls" className="d-flex flex-row border-top mt-3">
                {/* TODO: add functionality to buttons */}
                <button id="question-editor-cancel" className="btn btn-light border-secondary mx-2 my-3">Cancel</button>
                <button id="question-editor-save" className="btn btn-danger mx-2 my-3">Save</button>
            </div>
        </div>
    );
}