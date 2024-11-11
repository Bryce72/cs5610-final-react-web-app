import { useNavigate } from "react-router-dom";
import { useState } from 'react';

interface QuestionType {
    name: string;
    path: string;
    instructions: string;
}

const questionTypes = new Map<string, QuestionType>([
    ["Multiple Choice", {
        name: "Multiple Choice",
        path: "multiple-choice",
        instructions: "Enter your question text and multiple answers, then select the one correct answer."
    }],
    ["True/False", {
        name: "True/False",
        path: "true-false",
        instructions: "Enter your question text, then select if True or False is the correct answer."
    }],
    ["Fill in the Blanks", {
        name: "Fill in the Blanks",
        path: "fill-blanks",
        instructions: "Enter your question text, then define all possible correct answers for the blank. Students will see the question followed by a small text box to type their answer."
    }]
]);

const questionTypeNames = ["Multiple Choice", "True/False", "Fill in the Blanks"]


//this is the part of the question editor that is the same for all question types
export default function QuestionBasicsEditor() {
    const navigate = useNavigate();
    const [questionType, setQuestionType] = useState("Multiple Choice");

    const changeQuestionType = (questionName: string) => {
        setQuestionType(questionName);
        const qPath = questionTypes.get(questionName)?.path
        console.log(qPath)
        navigate(`${qPath}`);
    };

    // idea maybe: refactor into rows/columns to get rid of the extra div on the outside?
    return (
        <div>
            <div className="container mx-0">

                <div className="row d-flex align-items-center">

                    <div className='col'>
                        <input id="question-title" type="text" title="Question Title" placeholder="Question Title Here" className="form-control " />

                    </div>

                    <div className='col'>
                        <select
                            className="form-select"
                            value={questionType}
                            title="Question Type"
                            onChange={(e) => {
                                changeQuestionType(e.target.value);
                            }}
                        >
                            {questionTypeNames.map((qType) =>
                                <option value={qType}>
                                    {qType}
                                </option >
                            )}
                        </select>
                    </div>

                    {/* FIXME: make this right justified */}
                    <div className='col d-flex ms-5'>
                        <span className='fw-bold mx-2 mt-1'>pts:</span>
                        <label >
                            <input id="question-points" type="number" title="Number of Points" placeholder="0" className="form-control w-50" />
                        </label>
                    </div>
                </div>
            </div>

            <div id="question-editor-instructions" className="border-top mt-4">
                <p className='mt-2'>
                    {questionTypes.get(questionType)?.instructions}
                </p>
            </div>

            <label htmlFor="question-text">
                <h5>Question:</h5>
            </label>

            {/* TODO: turn this into a what you see is what you get editor */}
            <textarea id="question-text" className="form-control" defaultValue={"TODO: turn this into a WYSIWYG editor"} />

            <h5 className='mt-2'>Answers:</h5>
        </div>
    );
}