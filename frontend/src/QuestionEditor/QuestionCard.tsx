import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { QuizQuestion, QuestionType } from "../types/QuizQuestion";


import ReactQuill from "react-quill";
import { FaArrowRight } from "react-icons/fa";
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';

export default function QuestionCard({ question }: { question: QuizQuestion }) {
    return (
        <div className="question-card card mb-3 border-light">
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
                <div className="question-editor mt-4">
                    <QuestionBasicsEditor />
                    <Routes>
                        <Route path={`/${QuestionType.FillBlanks}`} element={<FillBlanksEditor />} />
                        <Route path={`/${QuestionType.TrueFalse}`} element={<TrueFalseEditor />} />
                        <Route path={`/${QuestionType.MultipleChoice}`} element={<MultipleChoiceEditor />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

//this is the part of the question editor that is the same for all question types
function QuestionBasicsEditor() {
    const questionTypes = new Map<string, any>([
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

    const navigate = useNavigate();
    const [questionType, setQuestionType] = useState("Multiple Choice");

    const changeQuestionType = (questionName: string) => {
        setQuestionType(questionName);
        const qPath = questionTypes.get(questionName)?.path;
        navigate(`${qPath}`);
    };

    return (
        <div className="container p-4 border rounded shadow-sm">
            {/* Question Basics Form */}
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
                        value={questionType}
                        title="Question Type"
                        onChange={(e) => changeQuestionType(e.target.value)}
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
                <div className="alert alert-secondary">
                    {questionTypes.get(questionType)?.instructions}
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
            </div>

            {/* Answers Section */}
            <div className="mt-4">
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
                className='btn float-end text-danger fs-5 border-light-subtle'
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
                className='btn float-end text-danger fs-5 border-light-subtle'
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
