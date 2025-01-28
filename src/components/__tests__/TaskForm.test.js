import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { addTask } from "../../features/tasks/tasksSlice";
import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../../features/tasks/tasksSlice";
import TaskForm from "../TaskForm";

jest.mock("../../features/tasks/tasksSlice", () => {
  const originalModule = jest.requireActual("../../features/tasks/tasksSlice");
  return {
    ...originalModule,
    addTask: jest.fn(),
  };
});

describe("TaskForm", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        tasks: tasksReducer,
      },
    });
    store.dispatch = jest.fn();
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <TaskForm />
      </Provider>
    );

  it("renders input and button", () => {
    renderComponent();

    expect(screen.getByPlaceholderText("Add a new task")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add task/i })).toBeInTheDocument();
  });

  it("updates input value when typing", () => {
    renderComponent();

    const input = screen.getByPlaceholderText("Add a new task");
    fireEvent.change(input, { target: { value: "New Task" } });

    expect(input.value).toBe("New Task");
  });

  it("dispatches addTask action with correct payload on form submission", () => {
    renderComponent();

    const input = screen.getByPlaceholderText("Add a new task");
    const button = screen.getByRole("button", { name: /add task/i });

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(button);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(addTask).toHaveBeenCalledWith({
      id: expect.any(Number),
      title: "New Task",
      completed: false,
    });
    expect(input.value).toBe("");
  });

  it("does not dispatch addTask when input is empty", () => {
    renderComponent();

    const button = screen.getByRole("button", { name: /add task/i });
    fireEvent.click(button);

    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it("does not dispatch addTask when input contains only whitespace", () => {
    renderComponent();

    const input = screen.getByPlaceholderText("Add a new task");
    const button = screen.getByRole("button", { name: /add task/i });

    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.click(button);

    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it("applies hover effect on the button", () => {
    renderComponent();

    const button = screen.getByRole("button", { name: /add task/i });

    fireEvent.mouseOver(button);
    expect(button).toHaveStyle("background-color: #0056b3");

    fireEvent.mouseOut(button);
    expect(button).toHaveStyle("background-color: #007BFF");
  });
});
