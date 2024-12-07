import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true }); //allow cookies
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER_A6;
export const USERS_API = `${REMOTE_SERVER}/api/users`;


export const signin = async (credentials: any) => {
    console.log(`ACCOUNT CLIENT signin - ${USERS_API}/signin`);
    const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
    return response;
};

export const signup = async (user: any) => {
    console.log(`ACCOUNT CLIENT signup - ${USERS_API}/signup`);
    const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
    return response.data;
};

export const updateUser = async (user: any) => {
    const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
    return response.data;
};

export const createUser = async (user: any) => {
    const response = await axios.post(`${USERS_API}`, user);
    return response.data;
};

export const deleteUser = async (userId: string) => {
    const response = await axios.delete(`${USERS_API}/${userId}`);
    return response.data;
};

export const getProfile = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
    return response.data;
};

export const signout = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
    return response.data;
};

export const findMyCourses = async () => {
    const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
    return data;
};

export const createCourse = async (course: any) => {
    //on the backend this also creates a new enrollment
    const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
    return data;
};

export const findAllUsers = async () => {
    const response = await axiosWithCredentials.get(USERS_API);
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
