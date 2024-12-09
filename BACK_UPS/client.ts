//retrieves the quizzes for a given course.
export const findQuizzesForCourse = async (courseId: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
  };
  
  export const createQuizForCourse = async (courseId: string) => {
    const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`, {});
    return response.data;
  };
  