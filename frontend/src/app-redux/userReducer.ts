import { createSlice } from "@reduxjs/toolkit";

//TODO: import initial value for the user
const initialState = {}

const userSlice = createSlice(
    {
        name: "user",
        initialState,
        // TODO: add reducers
        reducers: {}
    }
);


export const { } = userSlice.actions;
export default userSlice.reducer;