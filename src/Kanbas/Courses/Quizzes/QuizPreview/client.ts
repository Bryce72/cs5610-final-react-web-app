import axios from "axios";

const BASE_API = process.env.REACT_APP_BASE_API_URL || "https://kanbas-node-server-app-738l.onrender.com";
const QUIZ_API = `${BASE_API}/api/quiz`;

// Get all questions
export const findAllQuestions = async () => {
  const response = await axios.get(`${QUIZ_API}/questions`);
  return response.data;
};

// Get questions for a specific quiz
export const findQuizQuestions = async (quizId: string) => {
  try {
    const response = await axios.get(`${QUIZ_API}/${quizId}/questions`);
    console.log("API Response:", response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    throw error;
  }
};

// Get a specific question by ID
export const findQuestionById = async (questionId: string) => {
  const response = await axios.get(`${QUIZ_API}/questions/${questionId}`);
  return response.data;
};

// Create a new question for a quiz
export const createQuestion = async (quizId: string, question: any) => {
  try {
    const response = await axios.post(`${QUIZ_API}/${quizId}/questions`, {
      ...question,
      quiz: quizId, // Make sure quiz ID is included
    });
    return response.data;
  } catch (error) {
    console.error("Error creating question:", error);
    throw error;
  }
};

// Update an existing question
export const updateQuestion = async (questionId: string, question: any) => {
  const response = await axios.put(
    `${QUIZ_API}/questions/${questionId}`,
    question
  );
  return response.data;
};

// Delete a question
export const deleteQuestion = async (questionId: string) => {
  const response = await axios.delete(`${QUIZ_API}/questions/${questionId}`);
  return response.data;
};


export const createQuizAttempt = async (userID: string, quizID: string, quizAttempt: any) => {
  const response = await fetch(`/api/users/${userID}/quizzes/${quizID}/attempt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quizAttempt),
  });

  if (!response.ok) {
    throw new Error(`Failed to create quiz attempt: ${response.statusText}`);
  }

  return response.json();
};


export const getCurrentUser = async () => {
  const response = await fetch("/api/users/profile", { credentials: "include" });
  if (!response.ok) {
    throw new Error("Failed to fetch current user");
  }
  return response.json();
};