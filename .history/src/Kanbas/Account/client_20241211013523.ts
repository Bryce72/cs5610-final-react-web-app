import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;

function logHelper(clientName: string, apiUrl: string) {
  console.log(`Account/client - ${clientName}\n${apiUrl}`);
}

export const signin = async (credentials: any) => {
  console.log("testing");
  logHelper("signin", `${USERS_API}/signin`);
  const response = await axiosWithCredentials.post(
    `${USERS_API}/signin`,
    credentials
  );
  return response.data;
};

export const profile = async () => {
  logHelper("profile", `${USERS_API}/profile`);
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
};

export const signup = async (user: any) => {
  logHelper("signup", `${USERS_API}/signup`);
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  console.log("PLACING THIS LOG HERE TO SEE WHATS GOOD: ", user);
  return response.data;
};

export const signout = async () => {
  logHelper("signout", `${USERS_API}/signout`);
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};

export const findMyCourses = async () => {
  logHelper("findMyCourses", `${USERS_API}/current/courses`);
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/courses`
  );
  return data;
};

export const createCourse = async (course: any) => {
  logHelper("createCourse", `${USERS_API}/current/courses`);
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/courses`,
    course
  );
  return data;
};

export const findAllUsers = async () => {
  logHelper("findAllUsers", `${REMOTE_SERVER}/api/Account/users`);
  const response = await axiosWithCredentials.get(
    `${REMOTE_SERVER}/api/Account/users`
  );
  return response.data;
};

export const findUsersByRole = async (role: string) => {
  const response = await axios.get(`${USERS_API}?role=${role}`);
  return response.data;
};

export const findUsersByPartialName = async (name: string) => {
  const response = await axios.get(`${USERS_API}?name=${name}`);
  return response.data;
};

export const findUserById = async (id: string) => {
  const response = await axios.get(`${USERS_API}/${id}`);
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await axios.delete(`${USERS_API}/${userId}`);
  return response.data;
};

export const updateUser = async (user: any) => {
  const response = await axiosWithCredentials.put(
    `${USERS_API}/${user._id}`,
    user
  );
  return response.data;
};

export const createUser = async (user: any) => {
  const response = await axios.post(`${USERS_API}`, user);
  return response.data;
};

export const findCoursesForUser = async (userId: string) => {
  logHelper("findCoursesForUser", `${USERS_API}/${userId}/courses`);
  const response = await axiosWithCredentials.get(
    `${USERS_API}/${userId}/courses`
  );
  return response.data;
};

export const enrollIntoCourse = async (userId: string, courseId: string) => {
  logHelper("enrollIntoCourse", `${USERS_API}/${userId}/courses/${courseId}`);
  const response = await axiosWithCredentials.post(
    `${USERS_API}/${userId}/courses/${courseId}`
  );
  return response.data;
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
  logHelper("unenrollFromCourse", `${USERS_API}/${userId}/courses/${courseId}`);
  const response = await axiosWithCredentials.delete(
    `${USERS_API}/${userId}/courses/${courseId}`
  );
  return response.data;
};
