///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from "react";
import "./taskList.css";
import axios from "axios";
import AddMember from "../AddMember/AddMember";
import TaskHistory from "../TaskChanges/TaskChanges";
import TaskChanges from "../TaskChanges/TaskChanges";
// import Test from "../test/Test";

const url = "https://gozilla-server.onrender.com";

function TaskList({ allMembers = [], members, name }) {
  console.log(allMembers);
  const [tasks, setTasks] = useState([]);
  const [showTasks, setShowTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get(`${url}/api/tasks`);
      setShowTasks(response.data);
      // console.log(response.data);
    };
    fetchTasks();
  }, []);
  const [newTask, setNewTask] = useState({
    taskName: "",
    assignee: "",
    details: "",
    editing: false,
    editIndex: null,
  });

  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [assignees, setAssignees] = useState([]);
  const [selectedAssignee, setSelectedAssignee] = useState(name);
  const handleAssigneeChange = (e) => {
    setNewTask((prev) => ({
      ...prev,
      assignee: e.target.value,
    }));
  };

  const validateForm = () => {
    let errorsObj = {};

    if (!newTask.taskName.trim()) {
      errorsObj.taskName = "Task Name is required.";
    }

    if (!newTask.assignee.trim()) {
      errorsObj.assignee = "Assignee is required.";
    }

    if (!newTask.details.trim()) {
      errorsObj.details = "Task details are required.";
    }

    setErrors(errorsObj);

    return Object.keys(errorsObj).length === 0;
  };

  const handleInput = (e) => {
    setNewTask((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (newTask.editing) {
      const newTasks = [...tasks];
      const taskToUpdate = newTasks[newTask.editIndex];
      updateTask(taskToUpdate._id, newTask);
      newTasks[newTask.editIndex] = newTask;
      setTasks(newTasks);
    } else {
      createTask({
        ...newTask,
        completed: false,
        _id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      setTasks((prev) => [
        ...prev,
        {
          ...newTask,
          completed: false,
          _id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);
    }

    // else {
    //   createTask(newTask);
    //   setTasks((prev) => [
    //     ...prev,
    //     { ...newTask, completed: false, _id: Date.now().toString() },
    //   ]);
    // }

    setNewTask({
      taskName: "",
      assignee: "",
      details: "",
      editing: false,
      editIndex: null,
    });
    setShowModal(false);
  };

  const deleteTask = (id) => {
    axios
      .delete(`${url}/api/tasks/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setTasks((prev) => prev.filter((task) => task._id !== id));
        }
      })
      .catch((err) => console.error(err));
  };

  // const toggleComplete = async (id, completed) => {
  //   fetch(`${url}/api/tasks/${id}/completed`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ completed: !completed }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) =>
  //       setTasks((prev) =>
  //         prev.map((task) =>
  //           task._id === data._id
  //             ? { ...task, completed: data.completed }
  //             : task
  //         )
  //       )
  //     )
  //     .catch((err) => console.log(err));
  // };
  // const toggleComplete = async (id, completed) => {
  //   try {
  //     const response = await fetch(`${url}/api/tasks/${id}/completed`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ completed: !completed }),
  //     });
  //     const data = await response.json();
  //     setTasks((prev) =>
  //       prev.map((task) =>
  //         task._id === data._id
  //           ? {
  //               ...task,
  //               completed: completed,
  //             }
  //           : task
  //       )
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const toggleComplete = async (id, completed) => {
  //   try {
  //     const response = await fetch(`${url}/api/tasks/${id}/completed`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ completed: !completed }),
  //     });
  //     const data = await response.json();
  //     setTasks((prev) =>
  //       prev.map((task) =>
  //         task._id === data._id ? { ...task, completed: data.completed } : task
  //       )
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const toggleComplete = async (id, completed) => {
    try {
      const response = await fetch(`${url}/api/tasks/${id}/completed`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !completed }),
      });
      const data = await response.json();
      setTasks((prev) =>
        prev.map((task) =>
          task._id === data._id ? { ...task, completed: data.completed } : task
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find((task) => task._id === id);
    setNewTask({
      taskName: taskToEdit.taskName,
      assignee: taskToEdit.assignee,
      details: taskToEdit.details,
      editing: true,
      editIndex: tasks.findIndex((task) => task._id === id),
    });
    setShowModal(true);
  };

  // const createTask = (newTask) => {
  //   fetch(`${url}/api/tasks`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newTask),
  //   })
  //     .then((res) => res.json())
  //     .catch((err) => console.log(err));
  // };
  const createTask = (newTask) => {
    const currentDate = new Date().toISOString();
    const dataToSend = {
      ...newTask,
      createdAt: currentDate,
      updatedAt: currentDate,
    };
    fetch(`${url}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  // const updateTask = (id, updates) => {
  //   axios
  //     .patch(`${url}/api/tasks/${id}`, updates)
  //     .then(() => {
  //       console.log("Task updated successfully");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  const updateTask = (id, updates) => {
    const currentDate = new Date().toISOString();
    const dataToSend = {
      ...updates,
      updatedAt: currentDate,
    };
    axios
      .patch(`${url}/api/tasks/${id}`, dataToSend)
      .then(() => {
        console.log("Task updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetch(`${url}/api/tasks`)
      .then((res) => res.json())
      .then((data) => data.map((task) => ({ ...task, editing: false })))
      .then((data) => setTasks(data))
      .catch((err) => console.log(err));

    setAssignees(members);
  }, [members]);

  return (
    <div className="tasklist">
      {/* {allMembers.map((mem) => {
        // return <img src={mem.image[1]} className="member-image" />;
      })} */}
      {/* <ul className="image-container">
        {allMembers.map((mem, index) => (
          <li key={mem._id}>
            <img
              src={mem.image}
              // alt={mem.name}
       
              style={{ zIndex: index }}
            />
    
          </li>
        ))}
      </ul> */}
      <ul className="image-container">
        {allMembers.map((mem) => (
          <li key={mem.id}>
            <h3>{mem.name}</h3>
            {mem.image && (
              <img className="member-image" src={mem.image} alt={mem.name} />
            )}
          </li>
        ))}
      </ul>

      <h1>Task List</h1>
      <p>{tasks.length} tasks</p>
      <button onClick={() => setShowModal(true)}>Add New Task</button>

      <table>
        <thead>
          <tr>
            <th>Assignee</th>
            <th>Task Name</th>
            <th>Details</th>
            <th>Actions</th>
          </tr>
        </thead>{" "}
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.assignee}</td>
              <td className={task.completed ? "completed" : ""}>
                {task.taskName}
              </td>
              <td>{task.details}</td>
              <td>
                {task.completed ? (
                  <button
                    className="complete-btn"
                    onClick={() => toggleComplete(task._id, true)}
                  >
                    Mark as Incomplete
                  </button>
                ) : (
                  <button
                    className="complete-btn"
                    onClick={() => toggleComplete(task._id, false)}
                  >
                    Mark as Complete
                  </button>
                )}

                <button className="edit-btn" onClick={() => editTask(task._id)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="task-modal">
          <div className="modal-close" onClick={() => setShowModal(false)}>
            Close
          </div>
          <form className="modal-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="taskName">Task Name:</label>
              <input
                type="text"
                name="taskName"
                value={newTask.taskName}
                onChange={handleInput}
              />
              {errors.taskName && (
                <span className="error">{errors.taskName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="assignee">Assignee:</label>
              <select
                id="assignee"
                value={newTask.assignee}
                onChange={handleAssigneeChange}
              >
                <option value="">Select an Assignee</option>
                {assignees
                  .filter((member) => member !== name)
                  .map((assignee) => (
                    <option key={assignee} value={assignee}>
                      {assignee}
                    </option>
                  ))}
              </select>
              {errors.assignee && (
                <span className="error">{errors.assignee}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="details">Details:</label>
              <input
                type="text"
                name="details"
                value={newTask.details}
                onChange={handleInput}
              />
              {errors.details && (
                <span className="error">{errors.details}</span>
              )}
            </div>

            <button type="submit">
              {newTask.editing ? "Update" : "Create"}
            </button>
            <div className="modal-close" onClick={() => setShowModal(false)}>
              Close
            </div>
          </form>
        </div>
      )}
      {/* <AddMember showTasks={showTasks} /> */}
      {/* <TaskChanges showTasks={showTasks} /> */}
      {/* <Test /> */}
    </div>
  );
}
export default TaskList;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
