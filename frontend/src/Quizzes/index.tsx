import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setQuizzes } from "./reducer"; // Import necessary actions
// import quizzesData from "../Database/quizzes.json"; // Import quizzes data
import "bootstrap/dist/css/bootstrap.min.css";
import "react-quill/dist/quill.snow.css"; // Import styles for the editor
import Select from "react-select"; // Import React Select
import ReactQuill from "react-quill";


const formatDateForInput = (dateString: any) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ""; // Return an empty string if the date is invalid
    return date.toISOString().slice(0, 16); // Convert to 'YYYY-MM-DDTHH:MM' format
};

export default function Quizzes() {
    const dispatch = useDispatch();

    const test = useSelector((state: any) => {
        return state.quizzesReducer;
    });

    const quizzes = test.quizzes;

    // Select a quiz to display. Here, we take the first quiz as an example.
    const quiz = quizzes[0];

    // Local states for form fields based on the first quiz in the list
    const [quizName, setQuizName] = useState(quiz?.name || "");
    const [quizInstructions, setQuizInstructions] = useState(quiz?.description || "");
    const [quizType, setQuizType] = useState(quiz?.quiz_type || "hello?");
    const [assignmentGroup, setAssignmentGroup] = useState(quiz?.assignment_group || "ASSIGNMENTS");
    const [shuffleAnswers, setShuffleAnswers] = useState(quiz?.shuffle || false);
    const [timeLimitEnabled, setTimeLimitEnabled] = useState(Boolean(quiz?.time_limit));
    const [timeLimit, setTimeLimit] = useState(quiz?.time_limit?.toString() || "");
    const [allowMultipleAttempts, setAllowMultipleAttempts] = useState(quiz?.multiple_attempts || false);
    const [wordCount, setWordCount] = useState(0);
    const [activeTab, setActiveTab] = useState("details");
    const [points, setPoints] = useState(quiz.points || 0);
    const [publishStatus, setPublishStatus] = useState(quiz?.is_published ? "Published" : "Not Published");
    const [assignedTo, setAssignedTo] = useState(quiz.assign_to || []);

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

    // Custom styles for the tabs
    const tabStyle = {
        active: {
            color: "red",
            fontWeight: "bold",
            borderBottom: "2px solid red",
            cursor: "pointer",
            padding: "10px 20px",
        },
        inactive: {
            color: "gray",
            fontWeight: "normal",
            cursor: "pointer",
            padding: "10px 20px",
        },
    };

    return (
        <div className="container mt-4">
            {/* Header with Points and Publish Status */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>{quizName || "Quizzes"}</h3>
                <div className="d-flex align-items-center">
                    <span className="me-3">
                        <strong>Points:</strong> {points}
                    </span>
                    <span className="text-muted">
                        <i className="bi bi-circle"></i> {publishStatus}
                    </span>
                </div>
            </div>

            {/* Custom Tab Navigation */}
            <div className="mb-3 d-flex border-bottom">
                <span
                    onClick={() => setActiveTab("details")}
                    style={activeTab === "details" ? tabStyle.active : tabStyle.inactive}
                >
                    Details
                </span>
                <span
                    onClick={() => setActiveTab("questions")}
                    style={activeTab === "questions" ? tabStyle.active : tabStyle.inactive}
                >
                    Questions
                </span>
            </div>

            {/* Tab Content */}
            <div className="tab-content border p-4 bg-white">
                {activeTab === "details" && (
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
                                    defaultInputValue={assignedTo}
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
                )}

                {activeTab === "questions" && (
                    <div>
                        {/* Placeholder for Questions Tab Content */}
                        <h4>Questions Editor</h4>
                        <p>This is where you can add questions for the quiz.</p>
                    </div>
                )}
            </div>
        </div>
    );
}