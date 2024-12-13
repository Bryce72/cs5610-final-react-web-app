import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addQuiz, setQuizzes, deleteQuiz } from "../reducer"; // Import necessary actions
import "bootstrap/dist/css/bootstrap.min.css";
import "react-quill/dist/quill.snow.css"; // Import styles for the editor
import * as client from "../client";
import { useParams } from "react-router";
import QuestionEditor from "./QuestionEditor";
import ProtectedRole from "../../../Account/ProtectedRole";
import DetailsEditor from "./DetailsEditor";

export default function QuizEditor() {
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
    // console.log("check quiz 0", quiz);

    const [quizName, setQuizName] = useState("");
    const [quizInstructions, setQuizInstructions] = useState("");
    const [quizType, setQuizType] = useState("hello?");
    const [assignmentGroup, setAssignmentGroup] = useState("ASSIGNMENTS");
    const [shuffleAnswers, setShuffleAnswers] = useState(false);
    const [timeLimitEnabled, setTimeLimitEnabled] = useState(false);
    const [timeLimit, setTimeLimit] = useState("");
    const [allowMultipleAttempts, setAllowMultipleAttempts] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const [activeTab, setActiveTab] = useState("details");
    const [points, setPoints] = useState(0);
    const [publishStatus, setPublishStatus] = useState("Not Published");
    const [assignedTo, setAssignedTo] = useState<{ value: string; label: string }[]>([]);

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
            <ProtectedRole role="FACULTY">
                <div className="tab-content border p-4 bg-white">
                    {activeTab === "details" && (
                        <div>
                            <DetailsEditor />
                        </div>
                    )}

                    {activeTab === "questions" && (
                        <div>
                            <QuestionEditor />
                        </div>
                    )}
                </div>
            </ProtectedRole>
        </div>
    );
}