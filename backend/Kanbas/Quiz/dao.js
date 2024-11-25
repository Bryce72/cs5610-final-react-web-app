import model from "./model.js";

export function deleteAssignment(assignmentId) {
  return model.deleteOne({ _id: assignmentId });
}

export function getAssignmentsByCourse(assignmentId) {
  console.log("courseId", assignmentId);
  const res = model.find({ assignment: assignmentId });
  return res;
}

export function createAssignment(assignment) {
  delete assignment._id;
  return model.create(assignment);
}

export function updateAssignment(assignmentId, assignmentUpdates) {
  return model.updateOne({ _id: assignmentId }, assignmentUpdates);
}
