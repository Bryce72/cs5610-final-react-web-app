import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER_A6;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

//get assignments for this course GET
export const getAssignments = async (courseId: string) => {
    console.log(`ASSIGNMENT CLIENT: getAssignments ${ASSIGNMENTS_API}/${courseId}`)
    const response = await axios.get(`${ASSIGNMENTS_API}/${courseId}`);
    return response.data;
}

//get one specific assignment using id
export const getAssignment = async (assignmentId: string, courseId: string) => {
    console.log(`ASSIGNMENT CLIENT: getAssignment ${ASSIGNMENTS_API}/${courseId}/${assignmentId}`);
    const response = await axios.get(`${ASSIGNMENTS_API}/${courseId}/${assignmentId}`);
    return response.data;
}

//create assignment POST
export const createAssignment = async (assignment: any) => {
    console.log(`ASSIGNMENT CLIENT: createAssignment ${ASSIGNMENTS_API}`)
    const response = await axios.post(`${ASSIGNMENTS_API}`, assignment);
    return response.data;
}

//update assignment PUT
export const replaceAssignment = async (assignmentId: string, assignment: any) => {
    console.log(`ASSIGNMENT CLIENT: replaceAssignment ${ASSIGNMENTS_API}/${assignmentId}\n`);
    //console.log(`${JSON.stringify(assignment, null, 2)}`);
    const response = await axios.put(`${ASSIGNMENTS_API}/${assignmentId}`, assignment);
    return response.data;
}

//delete assignment DELETE
export const deleteAssignment = async (assignmentId: string) => {
    console.log(`ASSIGNMENT CLIENT: deleteAssignment ${ASSIGNMENTS_API}/${assignmentId}`);
    const response = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
    return response.data;
}
