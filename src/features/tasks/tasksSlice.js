import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    { id: 1, title: "Learn React", completed: false },
    { id: 2, title: "Build a project", completed: false },
  ],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
  },
});
export const { addTask } = tasksSlice.actions;
export default tasksSlice.reducer;
