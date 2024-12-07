import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const MODULES_API = `${REMOTE_SERVER}/api/modules`;
const axiosWithCredentials = axios.create({ withCredentials: true });


export const deleteModule = async (module: any) => {
  const response = await axiosWithCredentials.delete(
    `${MODULES_API}/${module}`
  );
  return response.data;
 };
 
export const updateModule = async (module: any) => {
    const { data } = await axiosWithCredentials.put(`${MODULES_API}/${module._id}`, module);
    return data;
  };
  