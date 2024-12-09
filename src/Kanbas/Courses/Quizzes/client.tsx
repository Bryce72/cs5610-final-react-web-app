import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const QUIZ_API = `${REMOTE_SERVER}/api/quizzes`;
const COURSE_ID = "6744e7072e798610ab356c31";

export const findQuizzesForCourse = async () => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${COURSE_ID}/quizzes`
  );
  return response.data;
};

export const createQuiz = async (quiz: any) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${COURSE_ID}/quizzes`,
    quiz
  );
  return response.data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.delete(`${QUIZ_API}/${quizId}`);
  return response.data;
};

export const updateQuiz = async (quiz: any) => {
  const response = await axiosWithCredentials.put(
    `${QUIZ_API}/${quiz._id}`,
    quiz
  );
  return response.data;
};

//added
export const getQuizById = async (quizId: any) => {
  const response = await axiosWithCredentials.get(`${QUIZ_API}/${quizId}`);
  console.log("getquizbyid" + response.data);
  return response.data;
};

export const createQuizForCourse = async (courseId: string) => {
  const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`, {});
  return response.data;
};
