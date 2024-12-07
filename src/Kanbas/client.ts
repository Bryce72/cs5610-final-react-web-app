import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLLMENT_API = `${REMOTE_SERVER}/api/enrollment/enroll`;

export const createEnrollment = async (course: any) => {
  const response = await axiosWithCredentials.post(
    `${ENROLLMENT_API}/${course._id}`,
    course
  );
  return response.data;
};

export const deleteEnrollment = async (course: any) => {
  const { data } = await axiosWithCredentials.delete(
    `${ENROLLMENT_API}/${course._id}`,
    course
  );
  return data;
};
