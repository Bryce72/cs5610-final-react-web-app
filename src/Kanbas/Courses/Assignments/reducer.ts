import { createSlice } from "@reduxjs/toolkit";
// import { assignments } from "../../Database";

const initialState = {
  assignments: [],
};
const assignmentSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },

    addAssignment: (state, { payload: assignment }) => {
      const newAssignment: any = {
        _id: assignment._id || new Date().getTime().toString(),
        title: assignment.title,
        course: assignment.course,
      };
      state.assignments = [...state.assignments, newAssignment] as any;
    },
    deleteAssignment: (state, { payload: assignmentID }) => {
      state.assignments = state.assignments.filter(
        (m: any) => m._id !== assignmentID
      );
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((m: any) =>
        m._id === assignment._id ? assignment : m
      ) as any;
    },
    editAssignment: (state, { payload: assignmentID }) => {
      state.assignments = state.assignments.map((m: any) =>
        m._id === assignmentID ? { ...m, editing: true } : m
      ) as any;
    },
  },
});

export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  editAssignment,
  setAssignments,
} = assignmentSlice.actions;

export default assignmentSlice.reducer;
