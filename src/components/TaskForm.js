import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasks/tasksSlice";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addTask({ id: Date.now(), title, completed: false }));
      setTitle("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        marginBottom: "20px",
        backgroundColor: "#ffffff",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task"
        style={{
          padding: "10px",
          fontSize: "16px",
          marginRight: "10px",
          width: "60%",
          border: "1px solid #ddd",
          borderRadius: "4px",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "10px 15px",
          fontSize: "16px",
          color: "#ffffff",
          backgroundColor: "#007BFF",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
