// import React from "react";
// import "./memberCard.css";
// import TaskList from "../MembersTable/TaskList";
// import { useReducer, useState, useEffect } from "react";
// import axios from "axios";
// const MemberCard = ({
//   name,
//   email,
//   skills,
//   age,
//   github,
//   linkedin,
//   image,
//   language,
//   showTasks = [],
// }) => {
//   // const [tasks, setTasks] = useState([]);
//   // useEffect(() => {
//   //   axios.get("http://localhost:3000/api/tasks").then((res) => {
//   //     setTasks(res.data);
//   //   });
//   // }, []);
//   // const memberTasks = tasks.filter((task) => task.taskName === name);
//   const [showComponent, setShowComponent] = useState(false);
//   // const numTasks = showTasks.filter((task) => task.taskName).length;
//   // const numTasks = showTasks.filter((task) => task.taskName).length;
//   const numTasks = showTasks.reduce((count, task) => {
//     return task.assignee === name && task.taskName ? count + 1 : count;
//   }, 0);
//   return (
//     // <div className="members-list">
//     <div className="user-card">
//       {showComponent ?? <TaskList name={name} className="Taskli" />}
//       <img src={image} alt="Profile photo" />
//       <h2>{name}</h2>
//       <span className={`task-count ${numTasks ? "golden" : ""}`}>
//         <span>{numTasks}</span>
//       </span>
//       <p>Skills: {skills}</p>ْ<p>Age: {age}</p>
//       <p>Language: {language}</p>
//       <p>
//         LinkedIn: <a href="https://www.linkedin.com/in/username">{linkedin}</a>
//       </p>
//       <p>
//         Github: <a href="https://github.com/username">{github}</a>
//       </p>
//       <p>
//         Email: <a href="https://github.com/username">{email}</a>
//       </p>
//       <div className="task">
//         <h3>Task</h3>
//         {showTasks ? (
//           <ul>
//             {/* {showTasks.map((task) => (
//               <li key={task.taskName}>
//                 {task.taskName && task.assignee === name}
//               </li>
//             ))} */}{" "}
//             {showTasks
//               .filter((task) => task.assignee === name)
//               .map((task) => (
//                 <li key={task.taskName}>{task.taskName}</li>
//               ))}
//             {showTasks.length === 0 && <p>No tasks assigned</p>}
//           </ul>
//         ) : (
//           <p>No tasks assigned</p>
//         )}
//       </div>
//     </div>
//     // </div>
//   );
// };

// export default MemberCard;
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
        <div className={`task-count ${numTasks >= 3 ? "golden" : ""}`}>
          <span>{numTasks}</span>
        </div>
        {/* <TaskList name={name} /> */}
        <img src={image} alt="Profile photo" />
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
