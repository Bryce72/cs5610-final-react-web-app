import axios from "axios";

const BASE_API = process.env.REACT_APP_BASE_API_URL || "http://localhost:4000";
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
