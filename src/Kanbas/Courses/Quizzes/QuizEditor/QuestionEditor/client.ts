import axios from "axios";
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export const addQuestion = async (newQuestion: any, quizId: string) => {
    const url = `${REMOTE_SERVER}/api/quiz/${quizId}/questions`;
    console.log(`QUESTION CLIENT - addQuestion ${url}`);
    const response = await axios.post(url, newQuestion);
    return response.data;
};

export const deleteQuestion = async (questionId: string) => {
    const url = `${REMOTE_SERVER}/api/quiz/questions/${questionId}`
    console.log(`QUESTION CLIENT - deleteQuestion ${url}`);
    const { data } = await axios.delete(url);
    return data;
};

export const updateQuestion = async (questionId: string, questionUpdates: any) => {
    const url = `${REMOTE_SERVER}/api/quiz/questions/${questionId}`;
    console.log(`QUESTION CLIENT - updateQuestion ${url}`);
    const { data } = await axios.post(url, questionUpdates);
    return data;
};

export const getQuestionsForQuiz = async (quizId: string) => {
    const url = `${REMOTE_SERVER}/api/quiz/${quizId}/questions`;
    console.log(`QUESTION CLIENT - getQuestionsForQuiz ${url}`);
    const { data } = await axios.get(url);
    return data;
}