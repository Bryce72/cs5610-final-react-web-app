import { createSlice } from "@reduxjs/toolkit";
import { Enrollment } from "../Types";

/*
export interface Enrollment {
    user_id: string,
    course_id: string
}
*/

//state.enrollments is a list of Enrollment objects
const initialState: { enrollments: Enrollment[] } = {
    enrollments: []
};

const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        setEnrollments: (state, action) => {
            console.log("ENROLLMENTS REDUCER - setting enrollments");
            // console.log(`${JSON.stringify(action.payload, null, 2)}`);
            state.enrollments = action.payload;
        },
        addEnrollment: (state, { payload: enrollment }) => {
            const newEnrollment = enrollment as Enrollment;
            console.log(`ENROLLMENTS REDUCER - trying to add an enrollment ${JSON.stringify(newEnrollment)}`);
            state.enrollments = [...state.enrollments, newEnrollment];
        },
        removeEnrollment: (state, { payload: enrollment }) => {
            const deleteEnrollment = enrollment as Enrollment;
            console.log(`ENROLLMENTS REDUCER - trying to remove ${JSON.stringify(deleteEnrollment)}`);

            state.enrollments = state.enrollments.filter((e) => {
                if (e.course === deleteEnrollment.course && e.user === deleteEnrollment.user) {
                    console.log(`\t\tREMOVING!`);
                    return false;
                } else {
                    return true;
                }
            });

        },
    }
});

export default enrollmentsSlice.reducer;
export const { setEnrollments, addEnrollment, removeEnrollment } = enrollmentsSlice.actions;