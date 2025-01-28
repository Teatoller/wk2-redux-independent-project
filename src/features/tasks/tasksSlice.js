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
    toggleTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    editTask: (state, action) => {
      const { id, newTitle } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.title = newTitle;
      }
    },
  },
});
export const { addTask, toggleTask, deleteTask, editTask } = tasksSlice.actions;
export default tasksSlice.reducer;
