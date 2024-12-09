import axios from "axios";
// export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
// export const API = `${REMOTE_SERVER}/api/questions`;

//TODO
export const addQuestion = async (newQuestion: any) => {
    const url = ``;
    console.log(`QUESTION CLIENT - addQuestion ${url}`);
    const { data } = await axios.post(url, newQuestion);
    return data;
};

//TODO
export const removeQuestion = async (questionId: string) => {
    const url = ``
    console.log(`QUESTION CLIENT - removeQuestion ${url}`);
    const { data } = await axios.delete(url);
    return data;
};

//TODO
export const getQuestionsForQuiz = async (quizId: string) => {
    const url = ``;
    console.log(`QUESTION CLIENT - getQuestionsForQuiz ${url}`);
    const { data } = await axios.get(url);
    return data;
}