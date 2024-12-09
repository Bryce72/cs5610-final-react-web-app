import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLLMENT_API = `${REMOTE_SERVER}/api/enrollment/enroll`;

export const createEnrollment = async (course: any) => {
  console.log(`Kanbas/client - createEnrollment\n${ENROLLMENT_API}/${course._id}`);

  const response = await axiosWithCredentials.post(
    `${ENROLLMENT_API}/${course._id}`,
    course
  );
  return response.data;
};

export const deleteEnrollment = async (course: any) => {
  console.log(`Kanbas/client - deleteEnrollment\n${ENROLLMENT_API}/${course._id}`);

  const { data } = await axiosWithCredentials.delete(
    `${ENROLLMENT_API}/${course._id}`,
    course
  );
  return data;
};
