import React from "react";
import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          textAlign: "center",
          fontSize: "24px",
          color: "#333",
        }}
      >
        Task List
      </h2>
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
