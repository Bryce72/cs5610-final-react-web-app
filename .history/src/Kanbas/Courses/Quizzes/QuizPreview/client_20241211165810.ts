import axios from "axios";

const BASE_API = process.env.REACT_APP_BASE_API_URL || "http://localhost:4000";
const QUIZ_API = `${BASE_API}/api/quiz`;

export const findAllQuestions = async () => {
  const response = await axios.get(`${QUIZ_API}/questions`);
  return response.data;
};

export const findQuizQuestions = async (quizId: string, courseId?: string) => {
  const url = courseId
    ? `${QUIZ_API}/${quizId}/questions?courseId=${courseId}`
    : `${QUIZ_API}/${quizId}/questions`;
  const response = await axios.get(url);
  return response.data;
};

export const findQuestionsByCourse = async (courseId: string) => {
  const response = await axios.get(`${QUIZ_API}/course/${courseId}/questions`);
  return response.data;
};

export const findQuestionById = async (questionId: string) => {
  const response = await axios.get(`${QUIZ_API}/questions/${questionId}`);
  return response.data;
};

export const createQuestion = async (question: any) => {
  const response = await axios.post(`${QUIZ_API}/questions`, question);
  return response.data;
};

export const updateQuestion = async (questionId: string, question: any) => {
  const response = await axios.put(
    `${QUIZ_API}/questions/${questionId}`,
    question
  );
  return response.data;
};

export const deleteQuestion = async (questionId: string) => {
  const response = await axios.delete(`${QUIZ_API}/questions/${questionId}`);
  return response.data;
};
