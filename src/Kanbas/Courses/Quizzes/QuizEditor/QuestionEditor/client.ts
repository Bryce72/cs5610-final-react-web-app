import axios from "axios";
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER || "https://kanbas-node-server-app-738l.onrender.com";


export const addQuestion = async (newQuestion: any, quizId: string) => {
    const url = `${REMOTE_SERVER}/api/quiz/${quizId}/questions`;
    console.log(`QUESTION CLIENT - addQuestion ${url}`);
    const response = await axios.post(url, newQuestion);
    console.log(`${JSON.stringify(response.data)}`);
    return response.data;
};

export const deleteQuestion = async (questionId: string) => {
    const url = `${REMOTE_SERVER}/api/questions/${questionId}`
    console.log(`QUESTION CLIENT - deleteQuestion ${url}`);
    const response = await axios.delete(url);
    return response;
};

export const updateQuestion = async (questionId: string, questionUpdates: any) => {
    const url = `${REMOTE_SERVER}/api/questions/${questionId}`;
    console.log(`QUESTION CLIENT - updateQuestion ${url}`);
    const { data } = await axios.put(url, questionUpdates);
    return data;
};

export const getQuestionsForQuiz = async (quizId: string) => {
    const url = `${REMOTE_SERVER}/api/quiz/${quizId}/questions`;
    console.log(`QUESTION CLIENT - getQuestionsForQuiz ${url}`);
    const { data } = await axios.get(url);
    return data;
}