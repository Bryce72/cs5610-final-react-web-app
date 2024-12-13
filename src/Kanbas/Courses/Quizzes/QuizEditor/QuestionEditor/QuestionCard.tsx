import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { QuizQuestion, QuestionType } from "../../types/QuizQuestion";
import { removeQuizQuestion, editQuizQuestion } from "./reducer"

import ReactQuill from "react-quill";
import { FaArrowRight } from "react-icons/fa";
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';
import React from "react";

export default function QuestionCard({ question }: { question: QuizQuestion }) {
    const [type, setType] = useState<QuestionType>(question.type || QuestionType.MultipleChoice);

    const [questionEdits, setQuestionEdits] = useState<QuizQuestion>();

    return (
        <div className="question-card card mb-5 border-faded">
            <div className="card-body">
                {/* Question Header */}
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title fw-bold">{question.title}</h5>
                    <div>
                        <button className="btn btn-sm btn-primary me-2">Edit</button>
                        <button className="btn btn-sm btn-outline-danger">Delete</button>
                    </div>
                </div>

                {/* Question Details */}
                <p className="mt-3 text-muted">
                    <strong>Question:</strong> {question.question}
                </p>

                {/* Question Editing Section */}
                <div className="question-editor container p-4 border rounded shadow-sm">
                    {<QuestionBasicsEditor type={type} setType={setType} />}
                    {type === QuestionType.TrueFalse && <TrueFalseEditor />}
                    {type === QuestionType.FillBlanks && <FillBlanksEditor />}
                    {type === QuestionType.MultipleChoice && <MultipleChoiceEditor />}
                </div>
            </div>
        </div>
    );
}

//this is the part of the question editor that is the same for all question types
function QuestionBasicsEditor({ type, setType, }: {
    type: QuestionType;
    setType: (type: QuestionType) => void;
}) {
    const questionNames = new Map<string, QuestionType>([
        ["Multiple Choice", QuestionType.MultipleChoice],
        ["True/False", QuestionType.TrueFalse],
        ["Fill in the Blanks", QuestionType.FillBlanks]
    ]);

    const questionTypesDict = new Map<string, any>([
        [QuestionType.MultipleChoice, {
            name: "Multiple Choice",
            instructions: "Enter your question text and multiple answers, then select the one correct answer."
        }],
        [QuestionType.TrueFalse, {
            name: "True/False",
            instructions: "Enter your question text, then select if True or False is the correct answer."
        }],
        [QuestionType.FillBlanks, {
            name: "Fill in the Blanks",
            instructions: "Enter your question text, then define all possible correct answers for the blank. Students will see the question followed by a small text box to type their answer."
        }]
    ]);

    const questionTypeNames = ["Multiple Choice", "True/False", "Fill in the Blanks"]

    return (
        <div>
            <div className="row mb-3 g-3 align-items-center">

                {/* Question Title */}
                <div className="col-md-6">
                    <label htmlFor="question-title" className="form-label">
                        Question Title
                    </label>
                    <input
                        id="question-title"
                        type="text"
                        title="Question Title"
                        placeholder="Enter question title"
                        className="form-control"
                    />
                </div>

                {/* Question Type Dropdown */}
                <div className="col-md-4">
                    <label htmlFor="question-type" className="form-label">
                        Question Type
                    </label>
                    <select
                        id="question-type"
                        className="form-select"
                        value={questionTypesDict.get(type).name}
                        title="Question Type"
                        onChange={(e) => {
                            const newType = questionNames.get(e.target.value);
                            console.log(`onChange -> newType = ${newType}`);
                            if (newType === undefined) {
                                return;
                            }
                            setType(newType);
                        }}
                    >
                        {questionTypeNames.map((qType, index) => (
                            <option key={index} value={qType}>
                                {qType}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Points Input */}
                <div className="col-md-2 text-end">
                    <label htmlFor="question-points" className="form-label">
                        Points
                    </label>
                    <input
                        id="question-points"
                        type="number"
                        title="Number of Points"
                        placeholder="0"
                        className="form-control"
                    />
                </div>
            </div>

            {/* Instructions Section */}
            <div id="question-editor-instructions" className="mt-4">
                <div className="alert alert-secondary border-0">
                    {questionTypesDict.get(type)?.instructions}
                </div>
            </div>

            {/* Question Text */}
            <div className="mt-4">
                <label htmlFor="question-text" className="form-label">
                    <h5>Question Text:</h5>
                </label>
                <ReactQuill
                    theme="snow"
                    placeholder="Type question text here..."
                    style={{ height: "200px" }}
                />
            </div> <br /> <br /> <br />

            {/* Answers Section */}
            <div>
                <h5>Answers:</h5>
                {/* Answers input will go here */}
            </div>
        </div>
    );
}

function MultipleChoiceEditor() {
    const [answerChoices, answerChoiceSetter] = useState<string[]>([]);

    return (
        <div id="question-editor-multiple-choice" className='mt-3 ps-5 pb-5'>
            {
                answerChoices.map(
                    (choice) => <div className='d-flex mb-5'>{answerChoice(choice)}</div>)
            }

            <button
                className='btn float-end fs-6 border-light-subtle btn-warning'
                onClick={(e) => {
                    answerChoiceSetter([...answerChoices, ""]);
                }}
            >
                + Add Another Answer
            </button>
        </div >
    );
}

function answerChoice(answerValue: string) {
    return (
        <div className="d-flex align-items-center">
            <span className="">Possible Answer</span>
            <input className="form-control" defaultValue={answerValue} />

            <FaRegEdit className='fs-2 ms-5' />
            <FaRegTrashAlt className='fs-2 mx-2' />
        </div>
    );
}

function TrueFalseEditor() {
    const [answerBool, setAnswer] = useState(true);

    return (
        <div id="question-editor-true-false" className="d-flex flex-column">

            <div className="my-3" onClick={e => setAnswer(true)}>
                <FaArrowRight className="fs-2 text-primary" visibility={answerBool ? "" : "hidden"} />
                <span className={`fs-4 fw-bold ms-2 ${answerBool ? "text-success" : ""}`}>
                    True
                </span>
            </div>


            <div onClick={e => setAnswer(false)}>
                <FaArrowRight className="fs-2 text-primary" visibility={answerBool ? "hidden" : ""} />
                <span className={`fs-4 fw-bold ms-2 ${answerBool ? "" : "text-danger"}`}>
                    False
                </span>
            </div>
        </div>
    );
}

function FillBlanksEditor() {
    const [blankOptions, blankOptionsSetter] = useState<string[]>([]);

    return (
        <div id="question-editor-fill-blanks" className='mt-3 ps-5 pb-5'>
            {
                blankOptions.map((blankOp) => <div className='d-flex mb-5'>{blankOption(blankOp)}</div>)
            }

            <button
                className='btn float-end fs-6 border-light-subtle btn-warning'
                onClick={(e) => {
                    blankOptionsSetter([...blankOptions, ""]);
                }}
            >
                + Add Another Answer
            </button>
        </div>
    );
}

function blankOption(optionValue: string) {
    return (
        <div className='d-flex align-items-center'>
            <span className="">Possible Answer</span>
            <input className="form-control" defaultValue={optionValue} />

            <FaRegTrashAlt className='fs-2 mx-2' />
        </div>
    );
}
