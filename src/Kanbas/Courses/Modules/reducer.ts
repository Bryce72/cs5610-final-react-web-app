import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modules: [],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {

    setModules: (state, { payload: modules }) => {
      state.modules = modules;
    },

    addModule: (state, { payload: module }) => {
      state.modules = [...state.modules, module] as any;
    },

    deleteModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.filter(
        (module: any) => module._id !== moduleId
      );
    },

    updateModule: (state, { payload: updatedModule }) => {
      state.modules = state.modules.map((module: any) =>
        module._id === updatedModule._id ? updatedModule : module
      ) as any;
    },

    editModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.map((module: any) =>
        module._id === moduleId ? { ...module, editing: true } : module
      ) as any;
    },
  },
});

export const { addModule, deleteModule, updateModule, editModule, setModules } =
  modulesSlice.actions;

export default modulesSlice.reducer;
