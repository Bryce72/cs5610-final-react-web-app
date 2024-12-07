import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;


const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const findAssignmentsForCourse = async (courseId: string) => {
    const response = await axiosWithCredentials
        .get(`${COURSES_API}/${courseId}/assignments`);
    return response.data;
};

export const createAssignment = async (courseId: string, assignment: any) => {
    const response = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/assignments`, assignment);
    return response.data;
};

const ASSIGNMENT_API = `${REMOTE_SERVER}/api/assignments`;

export const updateClientAssignment = async (assignment: any) => {
    const { data } = await axiosWithCredentials.
        put(`${ASSIGNMENT_API}/${assignment._id}`, assignment);
    console.log("client response", data);
    return data;
};


export const updateCourse = async (course: any) => {
    const { data } = await axiosWithCredentials.put(
        `${COURSES_API}/${course._id}`,
        course
    );
    return data;
};

export const deleteAssignment = async (assignmentID: string) => {
    const response = await axiosWithCredentials
        .delete(`${ASSIGNMENT_API}/${assignmentID}`);
    return response.data;
};

// export const createAssignmentNew = async (assignment: any) => {
//     const courseId = assignment.course;
//     const response = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/assignments/AssignmentEditorNew`, assignment);
//     return response.data;
// };


// export const createAssignmentNew = async (assignment: any) => {
//     try {
//         console.log("Creating assignment client:", assignment);
//         const courseId = assignment.course;
//         if (!courseId) {
//             throw new Error("Course ID is required");
//         }

//         const response = await axiosWithCredentials.post(
//             `${COURSES_API}/${courseId}/assignments/AssignmentEditorNew`,
//             assignment
//         );
//         return response.data;
//     } catch (error) {
//         console.error("Failed to create assignment:", error);
//         throw error;
//     }
// };
export const createAssignmentNew = async (assignment: any) => {
    try {
        console.log("Creating assignment client:", assignment);
        const courseId = assignment.course;
        if (!courseId) {
            throw new Error("Course ID is required");
        }

        const response = await axiosWithCredentials.post(
            `${COURSES_API}/${courseId}/assignments/AssignmentEditorNew`,
            assignment
        );
        console.log("Response from server:", response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to create assignment:", error);
        throw error;
    }
};

export const createAssForCourse = async (assignment: any) => {
    const courseId = assignment.course;
    const response = await axiosWithCredentials.post(
        `${COURSES_API}/${courseId}/assignments`,
        assignment
    );
    return response.data;
};
