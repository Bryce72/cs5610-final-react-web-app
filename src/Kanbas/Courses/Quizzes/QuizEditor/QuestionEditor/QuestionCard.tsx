import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { QuizQuestion, QuestionType } from "../../types/QuizQuestion";
import { removeQuizQuestion, editQuizQuestion } from "./reducer"

import ReactQuill from "react-quill";
import { FaArrowRight } from "react-icons/fa";
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';
import React from "react";

import * as client from "./client";

export default function QuestionCard({ question }: { question: QuizQuestion }) {
    const dispatch = useDispatch();

    const [editMode, setEditMode] = useState<boolean>(false);

    //state variable to collect all edits made to this question
    const [questionEdits, setQuestionEdits] = useState<QuizQuestion>();

    //state variables for each question attribute that can be edited
    const [type, setType] = useState<QuestionType>(question.type || QuestionType.MultipleChoice);
    const [answerChoices, answerChoiceSetter] = useState<any[]>(question.choices);
    const [title, setTitle] = useState<string>(question.title);
    const [prompt, setPrompt] = useState<string>(question.prompt);
    const [points, setPoints] = useState<number>(question.points);
    const [solution, setSolution] = useState<any>(question.solution);

    const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion>(question);
    const updateQuestion = (updatedQuestion: QuizQuestion) => {
        setCurrentQuestion(updatedQuestion);
    };

    const deleteQuestion = async () => {
        const questionId = question._id;

        console.log("Removing question:", questionId);
        await client.deleteQuestion(questionId);
        dispatch(removeQuizQuestion(questionId));
    };

    const saveQuestion = async () => {
        setEditMode(false);

        if (questionEdits === undefined) {
            console.log("no edits to save")
            return;
        }

        const editedQuestion = { ...question, ...questionEdits }
        console.log(`New Question:\n${JSON.stringify(editedQuestion, null, 2)}`);
        await client.updateQuestion(question._id, editedQuestion);
        dispatch(editQuizQuestion(editedQuestion))
    };

    return (
        <div className="question-card card mb-5 border-faded">
            <div className="card-body">
                {/* Question Header */}
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title fw-bold">{question.title}</h5>
                    <div>
                        {!editMode &&
                            <button
                                className="btn btn-sm btn-primary me-2"
                                onClick={e => setEditMode(true)}
                            >
                                Edit
                            </button>
                        }

                        {editMode &&
                            <button
                                className="btn btn-sm btn-success me-2"
                                onClick={e => saveQuestion()}
                            >
                                Save
                            </button>
                        }

                        <button
                            onClick={() => deleteQuestion()}
                            className="btn btn-sm btn-outline-danger">
                            Delete
                        </button>
                    </div>
                </div>

                {/* Question Prompt */}
                <p className="mt-3 text-muted">
                    <strong>Question:</strong> {question.prompt}
                </p>

                {/* Question Editing Section */}
                <div className="question-editor container p-4 border rounded shadow-sm">
                    {QuestionBasicsEditor({ type, setType, title, setTitle, prompt, setPrompt, points, setPoints, questionEdits, setQuestionEdits })}

                    {type === QuestionType.TrueFalse && <TrueFalseEditor question={currentQuestion} updateQuestion={updateQuestion} />}

                    {type === QuestionType.FillBlanks && <FillBlanksEditor solution={solution} setSolution={setSolution} />}

                    {type === QuestionType.MultipleChoice && MultipleChoiceEditor(question, questionEdits, setQuestionEdits, answerChoices, answerChoiceSetter)}
                </div>
            </div>
        </div>
    );
}

//this is the part of the question editor that is the same for all question types
function QuestionBasicsEditor({
    type,
    setType,
    title,
    setTitle,
    prompt,
    setPrompt,
    points,
    setPoints,
    questionEdits,
    setQuestionEdits
}: {
    type: QuestionType;
    setType: (type: QuestionType) => void;
    title: string;
    setTitle: (title: string) => void;
    prompt: string;
    setPrompt: (prompt: string) => void;
    points: number;
    setPoints: (points: number) => void;
    questionEdits: any;
    setQuestionEdits: (edits: any) => void;
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
                        className="form-control"
                        value={title}
                        title="Question Title"
                        type="text"
                        placeholder="Enter question title"
                        onChange={e => {
                            setTitle(e.target.value);
                            setQuestionEdits({ ...questionEdits, title: e.target.value })
                        }}
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
                            setQuestionEdits({ ...questionEdits, type: questionNames.get(e.target.value) });
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
                        className="form-control"
                        type="number"
                        placeholder="0"
                        value={points}
                        title="Number of Points"
                        onChange={e => {
                            const numPoints = parseInt(e.target.value);
                            if (numPoints >= 0) {
                                setPoints(numPoints);
                                setQuestionEdits({ ...questionEdits, points: numPoints });
                            }
                        }}
                    />
                </div>
            </div>

            {/* Instructions Section */}
            <div id="question-editor-instructions" className="mt-4">
                <div className="alert alert-secondary border-0">
                    {questionTypesDict.get(type)?.instructions}
                </div>
            </div>

            {/* Question Prompt */}
            <div className="mt-4">
                <label htmlFor="question-text" className="form-label">
                    <h5>Question Text:</h5>
                </label>
                <ReactQuill
                    theme="snow"
                    style={{ height: "200px" }}
                    placeholder="Type question text here..."
                    value={prompt}
                    onChange={content => {
                        if (content !== null) {
                            // FIXME: content has html tags
                            setPrompt(content);
                            setQuestionEdits({ ...questionEdits, prompt: content });
                        }
                    }}
                />
            </div> <br /> <br /> <br />

            {/* Answers Section */}
            <div>
                {/* todo: flush left */}
                <h5>Choices:</h5>
                {/* Answers input will go here */}
            </div>
        </div>
    );
}

function MultipleChoiceEditor(
    q: QuizQuestion,
    questionEdits: any,
    setQuestionEdits: any,
    answerChoices: string[],
    answerChoiceSetter: (choices: string[]) => void
) {
    const handleChoiceUpdate = (original: string, choiceUpdate: string) => {
        const i = answerChoices.findIndex(choice => choice === original);
        answerChoiceSetter(
            [...answerChoices.slice(0, i), choiceUpdate, ...answerChoices.slice(i + 1)]
        );
        setQuestionEdits({ ...questionEdits, choices: answerChoices });
    };

    const handleDeleteChoice = (index: number) => {
        // Remove the choice at the specified index
        const updatedChoices = answerChoices.filter((_, i) => i !== index);
        answerChoiceSetter(updatedChoices);
        setQuestionEdits({ ...questionEdits, choices: updatedChoices });
    };

    return (
        <div id="question-editor-multiple-choice" className="mt-3 ps-5 pb-5">
            {answerChoices !== undefined && answerChoices.length >= 0 &&
                answerChoices.map((choice, index) => (
                    <div key={index} className="d-flex mb-5 align-items-center">
                        {/* todo: flush left for more space */}
                        <span className="">Possible Answer</span>

                        <input
                            className="form-control"
                            defaultValue={choice}
                            onChange={(e) => handleChoiceUpdate(choice, e.target.value)} />
                        <FaRegTrashAlt
                            className="fs-2 me-2 ms-3 color-danger"
                            onClick={() => handleDeleteChoice(index)}
                        />
                    </div>
                ))}

            <button
                className="btn float-end fs-6 border-light-subtle btn-warning"
                onClick={() => {
                    console.log(`\tadding new choice to answer choices\n${JSON.stringify(answerChoices)}`);
                    if (answerChoices === undefined || answerChoices.length === 0) {
                        answerChoiceSetter([""]);
                    } else {
                        answerChoiceSetter([...answerChoices, ""]);
                    }
                    setQuestionEdits({ ...questionEdits, choices: answerChoices });
                }}
            >
                + Add Another Answer
            </button>
        </div>
    );
}

function TrueFalseEditor({
    question,
    updateQuestion,
}: {
    question: QuizQuestion;
    updateQuestion: (updatedQuestion: QuizQuestion) => void;
}) {
    const handleSolutionChange = async (newSolution: boolean) => {
        const updatedQuestion = {
            ...question,
            solution: newSolution,
        };
        updateQuestion(updatedQuestion);
        try {
            await client.updateQuestion(question._id, updatedQuestion);
            console.log("Question updated successfully:", updatedQuestion);
        } catch (error) {
            console.error("Failed to update question:", error);
        }
    };
    return (
        <div className="true-false-editor">
            <label>
                <input
                    type="radio"
                    value="true"
                    checked={question.solution === true}
                    onChange={() => handleSolutionChange(true)}
                />
                True
            </label>
            <label>
                <input
                    type="radio"
                    value="false"
                    checked={question.solution === false}
                    onChange={() => handleSolutionChange(false)}
                />
                False
            </label>
        </div>
    );
}

function FillBlanksEditor({ solution, setSolution }: { solution: string[]; setSolution: (newSolution: string[]) => void }) {
    const handleUpdateSolution = (index: number, newValue: string) => {
        const updatedSolution = [...solution];
        updatedSolution[index] = newValue;
        setSolution(updatedSolution);
    };

    // onClick={() => {
    //     console.log(`\tadding new choice to answer choices\n${JSON.stringify(answerChoices)}`);
    //     if (answerChoices === undefined || answerChoices.length === 0) {
    //         answerChoiceSetter([""]);
    //     } else {
    //         answerChoiceSetter([...answerChoices, ""]);
    //     }
    //     setQuestionEdits({ ...questionEdits, choices: answerChoices });
    // }}

    const handleAddBlank = () => {
        if (solution === undefined || solution.length === 0) {
            setSolution([""]);
        } else {
            setSolution([...solution, ""]);
        }
    };

    const handleRemoveBlank = (index: number) => {
        const updatedSolution = solution.filter((_, i) => i !== index);
        setSolution(updatedSolution);
    };

    return (
        <div id="question-editor-fill-blanks" className="mt-3 ps-5 pb-5">
            {solution !== undefined && solution.map((value, index) => (
                <div key={index} className="d-flex mb-5 align-items-center">
                    <span className="">Blank {index + 1}:</span>

                    <input
                        className="form-control mx-3"
                        value={value}
                        onChange={(e) => handleUpdateSolution(index, e.target.value)}
                    />
                    <FaRegTrashAlt
                        className="fs-2 color-danger"
                        onClick={() => handleRemoveBlank(index)}
                    />
                </div>
            ))}
            <button
                className="btn float-end fs-6 border-light-subtle btn-warning"
                onClick={handleAddBlank}
            >
                + Add Another Blank
            </button>
        </div>
    );
}