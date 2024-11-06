import FillBlanksEditor from "./FillBlanksEditor";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import QuestionBasicsEditor from "./QuestionBasicsEditor";
import TrueFalseEditor from "./TrueFalseEditor";
import { Routes, Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";


export default function QuestionEditor() {
    return (
        <div id="question-editor" >
            <div id="question-editor-main" >
                {/* TODO: actually create new question and then open the editor for a new question */}
                <button id="question-editor-new-question" className="btn btn-light border-secondary mx-2">+ New Question</button>
            </div>

            <br />

            <div id="question-editor-controls" className="d-flex flex-row">
                {/* TODO: add functionality to buttons */}
                <button id="question-editor-cancel" className="btn btn-danger mx-2">Cancel</button>
                <button id="question-editor-save" className="btn btn-success mx-2">Save</button>
            </div>

            <QuestionBasicsEditor />

                <Routes>
                    <Route path="/QuestionEditor/fill-blanks" element={<FillBlanksEditor />}></Route>
                    <Route path="/QuestionEditor/true-false" element={<TrueFalseEditor />}></Route>
                    <Route path="/QuestionEditor/multiple-choice" element={<MultipleChoiceEditor />}></Route>
                </Routes>

        </div>
    );
}