import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER; // TBD
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

export const findModulesForCourse = async (courseId: string) => {
    const response = await axios
        .get(`${QUIZZES_API}/${courseId}/modules`);
    return response.data;
};

export const createModule = async (courseId: string, module: any) => {
    const response = await axios.post(`${QUIZZES_API}/${courseId}/modules`, module);
    return response.data;
};

const MODULES_API = `${REMOTE_SERVER}/api/modules`;
export const deleteModule = async (moduleId: string) => {
    const response = await axios
        .delete(`${MODULES_API}/${moduleId}`);
    return response.data;
};

export const updateModule = async (module: any) => {
    const response = await axios.
        put(`${MODULES_API}/${module._id}`, module);
    return response.data;
};
