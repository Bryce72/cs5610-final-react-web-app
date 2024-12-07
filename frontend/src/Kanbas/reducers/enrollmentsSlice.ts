// enrollmentsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as db from '../Database';

interface Enrollment {
  user: string;
  course: string;
}

interface EnrollmentsState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentsState = {
  enrollments: [...db.enrollments], 
};

interface EnrollUnenrollPayload {
  userId: string;
  courseId: string;
}

const enrollmentsSlice = createSlice({
  name: 'enrollments',
  initialState,
  reducers: {
    enrollInCourse: (state, action: PayloadAction<EnrollUnenrollPayload>) => {
      const { userId, courseId } = action.payload;
      
      const alreadyEnrolled = state.enrollments.some(
        (enrollment) =>
          enrollment.user === userId && enrollment.course === courseId
      );
      if (!alreadyEnrolled) {
        state.enrollments.push({ user: userId, course: courseId });
      }
    },
    unenrollFromCourse: (state, action: PayloadAction<EnrollUnenrollPayload>) => {
      const { userId, courseId } = action.payload;
      state.enrollments = state.enrollments.filter(
        (enrollment) =>
          !(
            enrollment.user === userId &&
            enrollment.course === courseId
          )
      );
    },
  },
});

export const { enrollInCourse, unenrollFromCourse } = enrollmentsSlice.actions;

export default enrollmentsSlice.reducer;
