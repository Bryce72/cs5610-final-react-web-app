import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

console.log("COURSES_API:", COURSES_API); // Expect: http://localhost:4000/api/courses

export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};
