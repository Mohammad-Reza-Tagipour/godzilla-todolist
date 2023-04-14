// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const taskSchema = new Schema({
//   taskName: { type: String, required: true },
//   assignee: { type: String, required: true },
//   details: { type: String, required: true },
//   completed: { type: Boolean, required: true },
// });

// const Task = mongoose.model("Task", taskSchema);

// module.exports = Task;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const historySchema = new Schema({
  assignee: { type: String, required: true },
  completedAt: { type: Date, required: true },
});
const taskSchema = new Schema({
  taskName: { type: String, required: true },
  assignee: { type: String, required: true },
  details: { type: String, required: true },
  // completed: { type: Boolean, required: true },
  completed: { type: Boolean, required: true, default: false },
  // history: [historySchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
taskSchema.pre("save", function (next) {
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
