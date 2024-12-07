//SECTION 3.3.4 - Module Reducer

import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  modules: [],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    //4.5.1 - set the list of modules
    setModules: (state, action) => {
      state.modules = action.payload;
    },
    addModule: (state, { payload: module }) => {
      // using the module from payload create a new module
      const newModule: any = {
        _id: new Date().getTime().toString(),
        lessons: [],
        name: module.name,
        course: module.course,
      };
      //add the new module to the list of modules
      state.modules = [...state.modules, newModule] as any;
    },
    deleteModule: (state, { payload: moduleId }) => {
      //use our payload to filter out modules in the list that have the given id
      state.modules = state.modules.filter(
        (m: any) => m._id !== moduleId);
    },
    updateModule: (state, { payload: module }) => {
      state.modules = state.modules.map((m: any) =>
        m._id === module._id ? module : m
      ) as any;
    },
    editModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.map((m: any) => { //if this is the module with the correct id
        //map to a new object {} that has all the old fields but has editing set to true
        return m._id === moduleId ? { ...m, editing: true } : m
      }
      ) as any;
    },
  },
});
export const { setModules, addModule, deleteModule, updateModule, editModule } =
  modulesSlice.actions;
export default modulesSlice.reducer;