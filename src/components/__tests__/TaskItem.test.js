/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import TaskItem from "../TaskItem";
import { configureStore } from "@reduxjs/toolkit";

jest.mock("../../features/tasks/tasksSlice", () => {
  const originalModule = jest.requireActual("../../features/tasks/tasksSlice");
  return {
    ...originalModule,
    toggleTask: jest.fn(),
    deleteTask: jest.fn(),
    editTask: jest.fn(),
  };
});

const mockReducer = (state = { tasks: [] }, action) => state;

const renderComponent = (task, store) =>
  render(
    <Provider store={store}>
      <TaskItem task={task} />
    </Provider>
  );

describe("TaskItem", () => {
  let store;
  const task = {
    id: 1,
    title: "Test Task",
    completed: false,
  };

  beforeEach(() => {
    store = configureStore({
      reducer: {
        tasks: mockReducer,
      },
    });
    jest.clearAllMocks();
  });

  it("renders task title and checkbox", () => {
    const { getByText, getByRole } = renderComponent(task, store);
    expect(getByText("Test Task")).toBeInTheDocument();
    expect(getByRole("checkbox")).toBeInTheDocument();
    expect(getByRole("checkbox")).not.toBeChecked();
  });

  it("enters editing mode when edit button is clicked", () => {
    const { getByText, getByDisplayValue } = renderComponent(task, store);
    const editButton = getByText("Edit");
    fireEvent.click(editButton);

    expect(getByDisplayValue("Test Task")).toBeInTheDocument();
    expect(getByText("Save")).toBeInTheDocument();
    expect(getByText("Cancel")).toBeInTheDocument();
  });


  it("exits editing mode and resets title when Cancel is clicked", () => {
    const { getByText, getByDisplayValue, queryByText } = renderComponent(task, store);
    const editButton = getByText("Edit");
    fireEvent.click(editButton);

    const input = getByDisplayValue("Test Task");
    fireEvent.change(input, { target: { value: "Updated Task" } });

    const cancelButton = getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(queryByText("Save")).not.toBeInTheDocument();
    expect(queryByText("Cancel")).not.toBeInTheDocument();
    expect(getByText("Test Task")).toBeInTheDocument();
  });

  it("applies strikethrough when task is completed", () => {
    const completedTask = { ...task, completed: true };
    const { getByText } = render(
      <Provider store={store}>
        <TaskItem task={completedTask} />
      </Provider>
    );

    const taskTitle = getByText("Test Task");
    expect(taskTitle).toHaveStyle("text-decoration: line-through");
  });
});
