import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER_A6;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const fetchAllCourses = async () => {
    const { data } = await axios.get(COURSES_API);
    return data;
};

//4.4.3
export const deleteCourse = async (id: string) => {
    const { data } = await axios.delete(`${COURSES_API}/${id}`);
    return data;
};

//4.4.4
export const updateCourse = async (course: any) => {
    const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
    return data;
};

//4.5.1
export const findModulesForCourse = async (courseId: string) => {
    //console.log(`COURSES CLIENT - looking for modules from course ${courseId}`)
    const response = await axios.get(`${COURSES_API}/${courseId}/modules`);
    return response.data;
};

//4.5.2
export const createModuleForCourse = async (courseId: string, module: any) => {
    const response = await axios.post(
        `${COURSES_API}/${courseId}/modules`,
        module
    );
    return response.data;
};
