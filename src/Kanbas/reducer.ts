import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "./Database";

const initialState = {
  enrollments: enrollments,
};

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enrollCourse: (state, action) => {
      const { userId, courseId } = action.payload;
      if (
        !state.enrollments.some(
          (enrollment: any) =>
            enrollment.user === userId && enrollment.course === courseId
        )
      ) {
        state.enrollments.push({
          _id: Date.now().toString(),
          user: userId,
          course: courseId,
        });
      }
    },
    unenrollCourse: (state, action) => {
      const { userId, courseId } = action.payload;
      state.enrollments = state.enrollments.filter(
        (enrollment: any) =>
          !(enrollment.user === userId && enrollment.course === courseId)
      );
    },
  },
});

export const { enrollCourse, unenrollCourse } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
