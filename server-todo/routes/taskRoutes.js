const express = require("express");
const router = express.Router();
const Task = require("./task.js");

// // GET all tasks
// router.get("/", async (req, res) => {
//   try {
//     const tasks = await Task.find();
//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // GET a single task by ID
// router.get("/:id", getTask, (req, res) => {
//   res.json(res.task);
// });

// // CREATE a new task
// router.post("/", async (req, res) => {
//   const task = new Task({
//     taskName: req.body.taskName,
//     assignee: req.body.assignee,
//     details: req.body.details,
//     completed: false,
//   });
//   try {
//     const newTask = await task.save();
//     res.status(201).json(newTask);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // UPDATE a task
// router.patch("/:id", getTask, async (req, res) => {
//   if (req.body.taskName != null) {
//     res.task.taskName = req.body.taskName;
//   }
//   if (req.body.assignee != null) {
//     res.task.assignee = req.body.assignee;
//   }
//   if (req.body.details != null) {
//     res.task.details = req.body.details;
//   }
//   try {
//     const updatedTask = await res.task.save();
//     res.json(updatedTask);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // DELETE a task
// // router.delete("/:id", getTask, async (req, res) => {
// //   try {
// //     await res.task.remove();
// //     res.json({ message: "Task deleted" });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// // Middleware function to retrieve a task by ID
// async function getTask(req, res, next) {
//   let task;
//   try {
//     task = await Task.findById(req.params.id);
//     if (task == null) {
//       return res.status(404).json({ message: "Cannot find task" });
//     }
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }

//   res.task = task;
//   next();
// }

// module.exports = router;
// // //////////////////////
// const express = require("express");
// const router = express.Router();
// const Task = require("./task.js");

// GET all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single task by ID
router.get("/:id", getTask, (req, res) => {
  res.json(res.task);
});

// CREATE a new task
router.post("/", async (req, res) => {
  const currentDate = new Date().toISOString();
  const task = new Task({
    taskName: req.body.taskName,
    assignee: req.body.assignee,
    details: req.body.details,
    completed: false,
    createdAt: currentDate,
    updatedAt: currentDate,
  });
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a task
router.patch("/:id", getTask, async (req, res) => {
  const currentDate = new Date().toISOString();
  if (req.body.taskName != null) {
    res.task.taskName = req.body.taskName;
  }
  if (req.body.assignee != null) {
    res.task.assignee = req.body.assignee;
  }
  if (req.body.details != null) {
    res.task.details = req.body.details;
  }
  res.task.updatedAt = currentDate;
  try {
    const updatedTask = await res.task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a task
// router.delete("/:id", getTask, async (req, res) => {
//   try {
//     await res.task.remove();
//     res.json({ message: "Task deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// Middleware function to retrieve a task by ID
async function getTask(req, res, next) {
  let task;
  try {
    task = await Task.findById(req.params.id);
    if (task == null) {
      return res.status(404).json({ message: "Cannot find task" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.task = task;
  next();
}

module.exports = router;
