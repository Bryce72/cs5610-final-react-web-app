import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { QuizQuestion, QuestionType } from "../../types/QuizQuestion";
import { removeQuizQuestion, editQuizQuestion } from "./reducer"

import ReactQuill from "react-quill";
import { FaRegTrashAlt } from 'react-icons/fa';
import React from "react";

import * as client from "./client";

export default function QuestionCard({ question }: { question: QuizQuestion }) {
    const dispatch = useDispatch();

    const [editMode, setEditMode] = useState<boolean>(false);
    //state variable to collect all edits made to this question
    const [questionEdits, setQuestionEdits] = useState<any>();

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

        const editedQuestion = { ...question, ...questionEdits, solution: solution }

        console.log(`New Question:\n${JSON.stringify(editedQuestion, null, 2)}`);

        await client.updateQuestion(question._id, editedQuestion);
        dispatch(editQuizQuestion(editedQuestion))
    };

    const cancelEdits = async () => {
        setEditMode(false);
        setQuestionEdits(null); //reset edits
        setType(question.type); //reset question type
    }

    return (
        <div className="question-card card mb-5 border-faded">
            <div className="card-body">
                {/* Question Header */}
                <div className="d-flex justify-content-between align-items-center">
                    {!editMode &&
                        <h5 className="card-title fw-bold">{question.title}</h5>
                    }

                    {/* BUTTONS */}
                    <div id="question-card-buttons">
                        {!editMode &&
                            <span>
                                <button
                                    className="btn btn-sm btn-primary me-2"
                                    onClick={e => setEditMode(true)}
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => deleteQuestion()}
                                    className="btn btn-sm btn-outline-danger">
                                    Delete
                                </button>
                            </span>
                        }

                        {editMode &&
                            <div className="mb-3">
                                <button
                                    className="btn btn-sm btn-success me-2"
                                    onClick={e => saveQuestion()}
                                >
                                    Save
                                </button>

                                <button
                                    className="btn btn-sm btn-outline-danger me-2"
                                    onClick={e => cancelEdits()}
                                >
                                    Cancel
                                </button>
                            </div>
                        }


                    </div>
                </div>

                {/* Question Prompt */}
                {!editMode && (
                    <div className="d-flex align-items-center mt-1 mb-2">
                        <span className="fw-bold fs-5">Question Prompt:</span>
                        {question.prompt !== undefined && (
                            <p className="fs-5 mb-0 ms-2">
                                <strong>{question.prompt.replace(/<[^>]+>/g, '')}</strong>
                            </p>
                        )}
                    </div>
                )}

                {/* Question Editing Section */}
                <div className="question-editor container">

                    {QuestionBasicsEditor({ editMode, type, setType, title, setTitle, prompt, setPrompt, points, setPoints, questionEdits, setQuestionEdits })}

                    {type === QuestionType.TrueFalse && <TrueFalseEditor editMode={editMode} question={currentQuestion} updateQuestion={updateQuestion} />}

                    {type === QuestionType.FillBlanks && <FillBlanksEditor editMode={editMode} solution={solution} setSolution={setSolution} />}

                    {type === QuestionType.MultipleChoice && MultipleChoiceEditor(editMode, questionEdits, setQuestionEdits, answerChoices, answerChoiceSetter, solution, setSolution)}

                </div>
            </div>
        </div>
    );
}

// todo: if anyone wants to make this look less ugly feel free
//this is the part of the question editor that is the same for all question types
function QuestionBasicsEditor({
    editMode,
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
    editMode: boolean;
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

                {/* Instructions Section */}
                {editMode &&
                    <div id="question-editor-instructions" className="mt-4">
                        <div className="alert alert-secondary border-0">
                            {questionTypesDict.get(type)?.instructions}
                        </div>
                    </div>}

                {/* Question Title */}
                {editMode &&
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
                }
                {/* if !editMode the QuestionCard takes care of it for us */}


                {/* Question Type Dropdown */}
                {editMode &&
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
                    </div>}

                {!editMode &&
                    <div>
                        <span className="fw-bold">Question Type:   </span>
                        <span>{questionTypesDict.get(type).name}</span>
                    </div>
                }


                {/* Points */}
                {editMode &&
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
                    </div>}

                {!editMode &&
                    <div>
                        <span className="fw-bold">Points:   </span>
                        <span>{points}</span>
                    </div>
                }
            </div>

            {/* Question Prompt */}
            {editMode && <div className="mt-4">
                <label htmlFor="question-text" className="form-label">
                    <h5>Question Prompt:</h5>
                </label>
                <ReactQuill
                    theme="snow"
                    style={{ height: "200px" }}
                    placeholder="Type question text here..."
                    value={prompt}
                    onChange={content => {
                        if (content !== null) {
                            setPrompt(content);
                            setQuestionEdits({ ...questionEdits, prompt: content });
                        }
                    }}
                />
                <br /> <br /> <br />
            </div>
            }

            {/* Answers Section */}
            <div>
                {/* todo: flush left */}
                <p className="fw-bold">Choices:</p>
                {/* Answers input will go here */}
            </div>
        </div>
    );
}

function MultipleChoiceEditor(
    editMode: boolean,
    questionEdits: any,
    setQuestionEdits: any,
    answerChoices: string[],
    answerChoiceSetter: (choices: string[]) => void,
    solution: any,
    setSolution: (newSolution: any) => void

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
        <div id="question-editor-multiple-choice" className="mt-3">
            {answerChoices !== undefined && answerChoices.length >= 0 &&
                answerChoices.map((choice, index) => {
                    let isAnswer;
                    if (typeof solution === "string") {
                        //correct type of solution for a multiple choice
                        isAnswer = solution === choice;
                    } else {
                        isAnswer = false;
                    }

                    return (
                        <div key={index}
                            className={`d-flex mb-3 align-items-center form-control ${isAnswer ? `border-success border-3` : `border-0`}`}
                        >

                            {isAnswer &&
                                <button className="fw-bold btn py-2 pe-1 border-0 text-success">
                                    Correct Answer
                                </button>
                            }
                            {!isAnswer &&
                                <button className="fw-bold btn py-2 pe-1 border-0 text-muted"
                                    onClick={e => {
                                        if (editMode) {
                                            setSolution(choice)
                                        }
                                    }}>
                                    Possible Answer
                                </button>
                            }

                            <input
                                className="form-control"
                                defaultValue={choice}
                                onChange={(e) => handleChoiceUpdate(choice, e.target.value)}
                                disabled={!editMode}
                            />
                            {/* don't let them delete the correct answer */}
                            {editMode && !isAnswer &&
                                <FaRegTrashAlt
                                    className="fs-2 pb-1 ms-4 text-danger"
                                    onClick={() => handleDeleteChoice(index)}
                                />}
                        </div>
                    );
                }

                )}

            {editMode &&
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
                </button>}
        </div>
    );
}

function TrueFalseEditor({
    editMode,
    question,
    updateQuestion,
}: {
    editMode: boolean;
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
        <div>
            <div className="form-check pb-3 d-flex align-items-center">
                <input
                    id="question-card-true"
                    className="form-check-input mb-1"
                    type="radio"
                    value="true"
                    checked={question.solution === true}
                    onChange={() => handleSolutionChange(true)}
                    disabled={!editMode}
                />
                <label className="form-check-label ms-2 fs-5" htmlFor="question-card-true">True</label>
            </div>

            <div className="form-check pb-3 d-flex align-items-center">
                <input
                    id="question-card-false"
                    className="form-check-input mb-1"
                    type="radio"
                    value="false"
                    checked={question.solution === false}
                    onChange={() => handleSolutionChange(false)}
                    disabled={!editMode}
                />
                <label className="form-check-label ms-2 fs-5" htmlFor="question-card-false">False</label>
            </div>
        </div>
    );
}

function FillBlanksEditor({ editMode, solution, setSolution }: { editMode: boolean; solution: string[]; setSolution: (newSolution: string[]) => void }) {
    const handleUpdateSolution = (index: number, newValue: string) => {
        const updatedSolution = [...solution];
        updatedSolution[index] = newValue;
        setSolution(updatedSolution);
    };

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
        <div id="question-editor-fill-blanks" className="mt-3">
            {solution !== undefined && solution.length > 0 &&
                solution.map((value, index) => (
                    <div key={index} className="d-flex mb-2 align-items-center form-control border-0">
                        <label htmlFor={`question-blank-${value}-${index}`} className="form-label fw-bold">Blank {index + 1}:</label>

                        <input
                            id={`question-blank-${value}-${index}`}
                            className="form-control flex-grow-1 ms-4"
                            value={value}
                            onChange={(e) => handleUpdateSolution(index, e.target.value)}
                            disabled={!editMode}
                        />
                        {editMode && <FaRegTrashAlt
                            className="fs-2 text-danger ms-4 pb-1"
                            onClick={() => handleRemoveBlank(index)}
                        />}
                    </div>
                ))}


            {editMode &&
                <button
                    className="btn float-end fs-6 mt-2 btn-warning"
                    onClick={handleAddBlank}
                >
                    + Add Another Blank
                </button>}
        </div>
    );
}