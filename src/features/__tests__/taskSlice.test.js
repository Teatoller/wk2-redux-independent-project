import tasksReducer, { addTask, toggleTask, deleteTask, editTask } from "../tasks/tasksSlice";

describe("tasksSlice", () => {
  const initialState = {
    tasks: [
      { id: 1, title: "Learn React", completed: false },
      { id: 2, title: "Build a project", completed: false },
    ],
  };

  it("should return the initial state", () => {
    expect(tasksReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  describe("addTask", () => {
    it("should add a new task to the list", () => {
      const newTask = { id: 3, title: "Write tests", completed: false };
      const nextState = tasksReducer(initialState, addTask(newTask));
      expect(nextState.tasks).toHaveLength(3);
      expect(nextState.tasks[2]).toEqual(newTask);
    });
  });

  describe("toggleTask", () => {
    it("should toggle the completed status of a task", () => {
      const taskId = 1;
      const nextState = tasksReducer(initialState, toggleTask(taskId));
      expect(nextState.tasks[0].completed).toBe(true);

      const toggledBackState = tasksReducer(nextState, toggleTask(taskId));
      expect(toggledBackState.tasks[0].completed).toBe(false);
    });

    it("should do nothing if the task ID does not exist", () => {
      const invalidTaskId = 999;
      const nextState = tasksReducer(initialState, toggleTask(invalidTaskId));
      expect(nextState.tasks).toEqual(initialState.tasks);
    });
  });

  describe("deleteTask", () => {
    it("should remove a task by ID", () => {
      const taskId = 1;
      const nextState = tasksReducer(initialState, deleteTask(taskId));
      expect(nextState.tasks).toHaveLength(1);
      expect(nextState.tasks.find((task) => task.id === taskId)).toBeUndefined();
    });

    it("should do nothing if the task ID does not exist", () => {
      const invalidTaskId = 999;
      const nextState = tasksReducer(initialState, deleteTask(invalidTaskId));
      expect(nextState.tasks).toEqual(initialState.tasks);
    });
  });

  describe("editTask", () => {
    it("should update the title of a task", () => {
      const updatedTask = { id: 2, newTitle: "Complete a project" };
      const nextState = tasksReducer(initialState, editTask(updatedTask));
      expect(nextState.tasks[1].title).toBe("Complete a project");
    });

    it("should do nothing if the task ID does not exist", () => {
      const invalidUpdate = { id: 999, newTitle: "Non-existent task" };
      const nextState = tasksReducer(initialState, editTask(invalidUpdate));
      expect(nextState.tasks).toEqual(initialState.tasks);
    });
  });
});
