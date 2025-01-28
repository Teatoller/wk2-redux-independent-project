import React from "react";
import { useDispatch } from "react-redux";
import { toggleTask, deleteTask } from "../features/tasks/tasksSlice";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTask(task.id));
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <li>
      <>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
        />
        <span
          style={{
            textDecoration: task.completed ? "line-through" : "none",
          }}
        >
          {task.title}
        </span>
        <button onClick={handleDelete}>Delete</button>
      </>
    </li>
  );
};

export default TaskItem;
