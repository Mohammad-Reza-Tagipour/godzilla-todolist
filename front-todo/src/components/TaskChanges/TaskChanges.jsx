import React from "react";
import "./taskChanges.css";

function TaskChanges({ showTasks = [] }) {
  const formatTimestamp = (timestamp) => {
    if (!timestamp) {
      return "";
    }
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="task-changes">
      <h2>Task Changes</h2>
      {showTasks.map((task) => (
        <div key={task._id} className="task-change">
          <p>
            Task <strong>{task.taskName}</strong> was{" "}
            {task.completed
              ? "completed"
              : task.editing
              ? "edited"
              : "assigned"}{" "}
            to <strong>{task.assignee}</strong> at{" "}
            {formatTimestamp(task.createdAt)}.
          </p>
          {task.updatedAt !== task.createdAt && (
            <p>
              Last updated at {formatTimestamp(task.updatedAt)} by{" "}
              <strong>{task.assignee}</strong>.
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default TaskChanges;
