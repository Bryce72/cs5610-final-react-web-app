import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000/api";

// Fetch all courses
export const getAllCourses = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/courses`);
  return data;
};

// Fetch all enrollments
export const getAllEnrollments = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/enrollments`);
  return data;
};

// Enroll a user in a course
export const enrollUserInCourse = async (userId: string, courseId: string) => {
  const { data } = await axios.post(`${API_BASE_URL}/enrollments`, { userId, courseId });
  return data;
};

// Unenroll a user from a course
export const unenrollUserFromCourse = async (enrollmentId: string) => {
  await axios.delete(`${API_BASE_URL}/enrollments/${enrollmentId}`);
};
