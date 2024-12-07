import axios from "axios";

// Use the remote server environment variable for API base URL
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

// Delete an assignment by its ID
export const deleteAssignment = async (assignmentId: string) => {
  const response = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};

// Update an assignment by its ID
export const updateAssignment = async (assignment: any) => {
  const { data } = await axios.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
  return data;
};

// Get all assignments
export const getAllAssignments = async () => {
  const { data } = await axios.get(ASSIGNMENTS_API);
  return data;
};

// Create a new assignment
export const createAssignment = async (assignment: any) => {
  const { data } = await axios.post(ASSIGNMENTS_API, assignment);
  return data;
};

// Optional: Get assignments for a specific course
export const getAssignmentsForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${REMOTE_SERVER}/api/courses/${courseId}/assignments`);
  return data;
};
