import React from "react";
import "./memberCard.css";
import TaskList from "../MembersTable/TaskList";

const MemberCard = ({
  name,
  email,
  skills,
  age,
  github,
  linkedin,
  image,
  language,
  showTasks = [],
}) => {
  const numTasks = showTasks.filter((task) => task.assignee === name).length;

  return (
    <div className="member-card-container">
      <div className="user-card">
        {/* <TaskList name={name} /> */}
        <img className="image" src={image} alt="Profile photo" />
        <h2>{name}</h2>
        <p>Skills: {skills}</p>
        <p>Age: {age}</p>
        <p>Language: {language}</p>
        <p>
          LinkedIn:{" "}
          <a href={`https://www.linkedin.com/in/${linkedin}`}>{linkedin}</a>
        </p>
        <p>
          Github: <a href={`https://www.github.com/${github}`}>{github}</a>
        </p>
        <p>Email: {email}</p>
        <div className="task">
          <h3>Tasks</h3>
          {showTasks ? (
            <ul>
              {showTasks
                .filter((task) => task.assignee === name && !!task.taskName)
                .map((task) => (
                  <li key={task.taskName}>{task.taskName}</li>
                ))}
              {showTasks.length === 0 && <p>No tasks assigned</p>}
            </ul>
          ) : (
            <p>No tasks assigned</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
