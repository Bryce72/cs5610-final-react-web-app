import FillBlanksEditor from "./FillBlanksEditor";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import QuestionBasicsEditor from "./QuestionBasicsEditor";
import TrueFalseEditor from "./TrueFalseEditor";

export default function QuestionEditor() {
    return (
        <div id="question-editor" >
            <div id="question-editor-main" >
                {/* TODO: actually create new question and open multiple choice question editor */}
                <button id="question-editor-new-question" className="btn btn-light border-secondary mx-2">+ New Question</button>
            </div>

            <br />

            <div id="question-editor-controls" className="d-flex flex-row">
                {/* TODO: add functionality to buttons */}
                <button id="question-editor-save" className="btn btn-success mx-2">Save</button>
                <button id="question-editor-cancel" className="btn btn-danger mx-2">Cancel</button>
            </div>

            <br />
            <hr />
            <h4>Question Editor HTML:</h4>
            <QuestionBasicsEditor />

            <br />
            <hr />
            <h4>Multiple Choice Answers Editor HTML:</h4>
            <MultipleChoiceEditor />

            <br />
            <hr />
            <h4>True or False Answers Editor HTML:</h4>
            <TrueFalseEditor />

            <br />
            <hr />
            <h4>Fill in the Blank Answers Editor HTML:</h4>
            <FillBlanksEditor />
        </div>
    );
}