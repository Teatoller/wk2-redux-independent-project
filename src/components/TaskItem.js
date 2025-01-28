import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleTask, deleteTask, editTask } from "../features/tasks/tasksSlice";

const TaskItem = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTask(task.id));
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  const handleEdit = () => {
    if (newTitle.trim()) {
      dispatch(editTask({ id: task.id, newTitle }));
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setNewTitle(task.title);
    setIsEditing(false);
  };

  return (
    <li
      style={{
        marginBottom: "15px",
        padding: "15px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fafafa",
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {isEditing ? (
        <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleEdit()}
            autoFocus
            style={{
              flex: 1,
              marginRight: "10px",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              outline: "none",
            }}
          />
          <button
            onClick={handleEdit}
            style={{
              marginRight: "8px",
              padding: "8px 12px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Save
          </button>
          <button
            onClick={handleCancelEdit}
            style={{
              padding: "8px 12px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleToggle}
              style={{
                marginRight: "10px",
                transform: "scale(1.5)",
                cursor: "pointer",
              }}
            />
            <span
              style={{
                flex: 1,
                textDecoration: task.completed ? "line-through" : "none",
                color: task.completed ? "#9e9e9e" : "#333",
                fontSize: "16px",
                wordBreak: "break-word",
              }}
            >
              {task.title}
            </span>
          </div>
          <div>
            <button
              onClick={() => setIsEditing(true)}
              style={{
                marginRight: "8px",
                padding: "8px 12px",
                backgroundColor: "#FFC107",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              style={{
                padding: "8px 12px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TaskItem;
