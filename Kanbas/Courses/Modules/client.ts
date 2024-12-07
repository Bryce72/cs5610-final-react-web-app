import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER_A6;
const MODULES_API = `${REMOTE_SERVER}/api/modules`;

//4.5.3
export const deleteModule = async (moduleId: string) => {
    const response = await axios.delete(`${MODULES_API}/${moduleId}`);
    return response.data;
};

//4.5.4
export const updateModule = async (module: any) => {
    const { data } = await axios.put(`${MODULES_API}/${module._id}`, module);
    return data;
};
