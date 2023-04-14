const uri = process.env.MONGODB_URI;
const express = require("express");
const Task = require("./routes/task");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(cors());

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/taskRoutes.js");
// Enable cross-origin requests
// Connect to MongoDB database
mongoose
  .connect(
    "mongodb+srv://todo:todo@cluster0.nk6nhpe.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => console.log(err));

app.use(bodyParser.json());

// Use task routes
app.use("/api/tasks", taskRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

const tasks = []; // Sample data
app.use("/api/tasks", taskRoutes);

app.get("/api/tasks", (req, res) => {
  return res.json(tasks);
});

// app.post("/api/tasks", (req, res) => {
//   const newTask = { ...req.body };
//   tasks.push(newTask);
//   return res.json(newTask);
// });
app.post("/api/tasks", async (req, res) => {
  const newTask = {
    taskName: req.body.taskName,
    assignee: req.body.assignee,
    details: req.body.details,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    const createdTask = await Task.create(newTask);
    res.status(201).json(createdTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// app.patch("/api/tasks/:id", (req, res) => {
//   const { id } = req.params;
//   const taskToUpdate = tasks.find((task) => task._id === id);
//   const updatedTask = { ...taskToUpdate, ...req.body };
//   tasks.splice(tasks.indexOf(taskToUpdate), 1, updatedTask);
//   return res.json(updatedTask);
// });

app.patch("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const updates = {
    taskName: req.body.taskName,
    assignee: req.body.assignee,
    details: req.body.details,
    completed: req.body.completed,
    updatedAt: new Date(),
  };

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, updates, {
      new: true,
    });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

///

// app.delete("/api/tasks/:id", async (req, res) => {
//   const taskId = req.params.id;
//   try {
//     const task = await Task.findById(taskId);
//     if (!task) {
//       return res.status(404).send({ message: "Task not found" });
//     }
//     await task.delete();
//     return res.send({ message: "Task deleted" });
//   } catch (error) {
//     return res.status(500).send({ message: "Error deleting task" });
//   }
// });
// DELETE task by ID
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    return res.json(tasks);
  } catch (error) {
    console.log(`Database Error: ${error.message}`);
    return res.status(500).json({ error: "Server Error" });
  }
});
// Task.findByIdAndUpdate(id, { completed }, { new: true }).then((task) => {
//   res.json(task);

app.patch("/api/tasks/:id/completed", async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const task = await Task.findById(id);
    task.completed = completed;

    if (completed) {
      task.history.push({
        assignee: task.assignee,
        completedAt: Date.now(),
      });
    }

    await task.save();
    res.json(task);
  } catch (err) {
    console.error("Error updating task: ", err);
    res.status(500).json(`Server Error: ${err}`);
  }
});

app.get("/api/tasks/:id/history", async (req, res) => {
  try {
    const history = await Task.find(
      { completed: true },
      { taskName: 1, assignee: 1, history: 1 }
    ).lean();

    res.json(history);
  } catch (err) {
    console.error("Error retrieving task history: ", err);
    res.status(500).json(`Server Error: ${err}`);
  }
});
// Add error handling
app.use((err, req, res, next) => {
  res.status(500).json(`Server error: ${err}`);
});
const memberRouter = require("./routes/member.js");

app.use("/api/members", memberRouter);
