import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import Select from "react-select/base";
import { setQuizzes } from "../../reducer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as client from "../../client";

const formatDateForInput = (dateString: any) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ""; // Return an empty string if the date is invalid
    return date.toISOString().slice(0, 16); // Convert to 'YYYY-MM-DDTHH:MM' format
};

export default function DetailsEditor() {
    const { cid } = useParams(); // Get the course ID from the URL
    const dispatch = useDispatch();
    const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);

    // get quiz
    const fetchQuizzes = async () => {
        const quizzes = await client.findQuizzesForCourse();
        dispatch(setQuizzes(quizzes));
    };
    console.log("check quizzes", quizzes);

    useEffect(() => {
        if (quizzes.length > 0) {
            const quiz = quizzes[0];
            setQuizName(quiz?.name || "");
            setQuizInstructions(quiz?.description || "");
            setQuizType(quiz?.quiz_type || "hello?");
            setAssignmentGroup(quiz?.assignment_group || "ASSIGNMENTS");
            setShuffleAnswers(quiz?.shuffle || false);
            setTimeLimitEnabled(Boolean(quiz?.time_limit));
            setTimeLimit(quiz?.time_limit?.toString() || "");
            setAllowMultipleAttempts(quiz?.multiple_attempts || false);
            setPoints(quiz?.points || 0);
            setPublishStatus(quiz?.is_published ? "Published" : "Not Published");
            setAssignedTo(quiz?.assign_to || []);
        }
    }, [quizzes]);

    // Select a quiz to display. Here, we take the first quiz as an example.
    const quiz = quizzes[0];
    console.log("check quiz 0", quiz);

    const [quizName, setQuizName] = useState("");
    const [quizInstructions, setQuizInstructions] = useState("");
    const [quizType, setQuizType] = useState("hello?");
    const [assignmentGroup, setAssignmentGroup] = useState("ASSIGNMENTS");
    const [shuffleAnswers, setShuffleAnswers] = useState(false);
    const [timeLimitEnabled, setTimeLimitEnabled] = useState(false);
    const [timeLimit, setTimeLimit] = useState("");
    const [allowMultipleAttempts, setAllowMultipleAttempts] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const [points, setPoints] = useState(0);
    const [publishStatus, setPublishStatus] = useState("Not Published");
    const [assignedTo, setAssignedTo] = useState<{ value: string; label: string }[]>([]);

    // Options for the "Assign to" field
    const assignOptions = [
        { value: "everyone", label: "Everyone" },
        { value: "students", label: "Students" },
        { value: "teachers", label: "Teachers" },
    ];

    // Handle content change in the editor to update word count
    const handleInstructionsChange = (content: any) => {
        setQuizInstructions(content);
        const text = content.replace(/<[^>]+>/g, ""); // Remove HTML tags
        const words = text.trim().split(/\s+/).filter(Boolean); // Count words
        setWordCount(words.length);
    };


    return (
        <div>
            {/* Details Tab Content */}
            <div className="mb-4">
                <label className="form-label">Title</label>
                <input
                    type="text"
                    className="form-control"
                    value={quizName}
                    onChange={(e) => setQuizName(e.target.value)}
                    placeholder="Unnamed Quiz"
                />
            </div>

            <div className="mb-4">
                <label className="form-label">Quiz Instructions:</label>
                <ReactQuill
                    theme="snow"
                    value={quizInstructions}
                    onChange={handleInstructionsChange}
                    placeholder="Type instructions here..."
                    style={{ height: "200px" }}
                />
                <div className="d-flex justify-content-between mt-2">
                    <span className="text-muted">{wordCount} words</span>
                </div>
            </div>

            {/* Additional Fields Below Text Editor */}
            <div className="row mb-4">
                <div className="col-md-6">
                    <label className="form-label">Quiz Type</label>
                    <select
                        className="form-select"
                        defaultValue={quizType}
                        onChange={(e) => setQuizType(e.target.value)}
                    >
                        <option value="Graded Quiz">Graded Quiz</option>
                        <option value="Practice Quiz">Practice Quiz</option>
                        <option value="Graded Survey">Graded Survey</option>
                        <option value="Ungraded Survey">Ungraded Survey</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Assignment Group</label>
                    <select
                        className="form-select"
                        defaultValue={assignmentGroup}
                        onChange={(e) => setAssignmentGroup(e.target.value)}
                    >
                        <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                        <option value="EXAMS">EXAMS</option>
                        <option value="QUIZZES">QUIZZES</option>
                        <option value="PROJECT">PROJECT</option>
                    </select>
                </div>
            </div>

            {/* Options Section */}
            <div className="mb-4">
                <h5>Options</h5>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={shuffleAnswers}
                        onChange={(e) => setShuffleAnswers(e.target.checked)}
                    />
                    <label className="form-check-label">Shuffle Answers</label>
                </div>
                <div className="d-flex align-items-center mb-3">
                    <input
                        type="checkbox"
                        className="form-check-input me-2"
                        checked={timeLimitEnabled}
                        onChange={(e) => setTimeLimitEnabled(e.target.checked)}
                    />
                    <label className="form-check-label me-2">Time Limit</label>
                    <input
                        type="number"
                        className="form-control"
                        style={{ width: "100px" }}
                        defaultValue={timeLimit}
                        onChange={(e) => setTimeLimit(e.target.value)}
                        placeholder="Minutes"
                        disabled={!timeLimitEnabled}
                    />
                    <span className="ms-2">Minutes</span>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={allowMultipleAttempts}
                        onChange={(e) => setAllowMultipleAttempts(e.target.checked)}
                    />
                    <label className="form-check-label">Allow Multiple Attempts</label>
                </div>
            </div>

            {/* Assign Section */}
            <div className="mb-4">
                <h5>Assign</h5>
                <div className="border p-3">
                    <label className="form-label">Assign to</label>
                    <Select
                        isMulti
                        options={assignOptions}
                        //FIXME!!!!!
                        defaultValue={assignedTo}
                        onChange={(selectedOptions) =>
                            setAssignedTo(selectedOptions as { value: string; label: string }[])
                        }
                        placeholder="Select assignees"
                        className="mb-3"
                    />
                    <label className="form-label">Due</label>
                    <input type="datetime-local" className="form-control mb-3" defaultValue={formatDateForInput(quiz?.due_date)} />

                    <div className="row">
                        <div className="col-md-6">
                            <label className="form-label">Available from</label>
                            <input type="datetime-local" className="form-control" defaultValue={formatDateForInput(quiz?.available_from)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Until</label>
                            <input type="datetime-local" className="form-control" defaultValue={formatDateForInput(quiz?.available_until)} />
                        </div>
                    </div>

                    <button className="btn btn-outline-secondary btn-light mt-3 w-100">
                        + Add
                    </button>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex justify-content-end mt-4">
                <button className="btn btn-outline-secondary me-2">Cancel</button>
                <button className="btn btn-danger">Save</button>
            </div>
        </div>
    );
}

function dispatch(arg0: { payload: any; type: "quizzes/setQuizzes"; }) {
    throw new Error("Function not implemented.");
}
