import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build a project", completed: false },
  ],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
    reducers: {},
});

export default tasksSlice.reducer;
