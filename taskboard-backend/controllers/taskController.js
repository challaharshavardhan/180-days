// controllers/taskController.js

const Task = require('../models/Task');

// Create a new task (pawn on tile 1)
const createTask = async (req, res) => {
  try {
    console.log("🔥 Create Task endpoint hit");
    console.log("👤 User ID:", req.user._id);
    console.log("📦 Task Data:", req.body);

    const { title, description } = req.body;
    const userId = req.user._id;

    // ✅ Count all active tasks (not completed) for the user
    const activeTasks = await Task.countDocuments({
      userId,
      status: { $ne: 'completed' },
    });

    // ✅ Limit to 4 active tasks across the board
    if (activeTasks >= 4) {
      return res.status(400).json({
        message: "You can only have 4 active tasks. Complete one to add a new task.",
      });
    }

    // ✅ Create task
    const task = new Task({
      title,
      description,
      userId,
      tilePosition: 1,
      status: 'in-progress',
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error("❌ Error creating task:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get all tasks for authenticated user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.taskId,
      userId: req.user._id,
    });

    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update task (upload file, mark progress, etc.)
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.taskId,
      userId: req.user._id,
    });

    if (!task) return res.status(404).json({ message: 'Task not found' });

    const now = new Date();
    const last = task.lastProgressDate;

    const isSameDay =
      last &&
      now.getFullYear() === last.getFullYear() &&
      now.getMonth() === last.getMonth() &&
      now.getDate() === last.getDate();

    if (isSameDay) {
      return res.status(400).json({ message: 'You can only update once per day' });
    }

    task.tilePosition += 1;
    task.lastProgressDate = now;
    task.fileUrl = req.body.fileUrl || task.fileUrl;

    if (task.tilePosition >= 180) {
      task.status = 'completed';
    }

    await task.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.taskId,
      userId: req.user._id,
    });

    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};

//controllers is working fine i.e not checking atmax 4 tasks 
// // controllers/taskController.js

// const Task = require('../models/Task');
// const existingTasks = await Task.find({ userId: req.user._id, tilePosition: 1, status: { $ne: 'completed' } });
// if (existingTasks.length >= 4) {
//   return res.status(400).json({ message: "You can only have 4 active tasks on the first tile. Complete one to add a new task." });
// }
// else{
// // Create a new task (pawn on tile 1)
// const createTask = async (req, res) => {
//   try {
//     console.log("🔥 Create Task endpoint hit");
//     console.log("👤 User ID:", req.user._id);
//     console.log("📦 Task Data:", req.body);
//     const { title, description } = req.body;
//     const userId = req.user._id;

//     const task = new Task({
//       title,
//       description,
//       userId,
//       tilePosition: 1,
//     });

//     await task.save();
//     res.status(201).json(task);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
// }
// // Get all tasks for authenticated user
// const getTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find({ userId: req.user._id });
//     res.status(200).json(tasks);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get a single task by ID
// const getTaskById = async (req, res) => {
//   try {
//     const task = await Task.findOne({
//       _id: req.params.taskId,
//       userId: req.user._id,
//     });

//     if (!task) return res.status(404).json({ message: 'Task not found' });

//     res.status(200).json(task);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Update task (upload file, mark progress, etc.)
// const updateTask = async (req, res) => {
//   try {
//     const task = await Task.findOne({
//       _id: req.params.taskId,
//       userId: req.user._id,
//     });

//     if (!task) return res.status(404).json({ message: 'Task not found' });

//     const now = new Date();
//     const last = task.lastProgressDate;

//     const isSameDay =
//     last &&
//     now.getFullYear() === last.getFullYear() &&
//     now.getMonth() === last.getMonth() &&
//     now.getDate() === last.getDate();

//   if (isSameDay) {
//     return res.status(400).json({ message: 'You can only update once per day' });
//   }

//     task.tilePosition += 1;
//     task.lastProgressDate = now;
//     task.fileUrl = req.body.fileUrl || task.fileUrl;
//     if (task.tilePosition >= 180) task.status = 'completed';

//     await task.save();
//     res.status(200).json(task);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Delete a task
// const deleteTask = async (req, res) => {
//   try {
//     const task = await Task.findOneAndDelete({
//       _id: req.params.taskId,
//       userId: req.user._id,
//     });

//     if (!task) return res.status(404).json({ message: 'Task not found' });

//     res.status(200).json({ message: 'Task deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = {
//   createTask,
//   getTasks,
//   getTaskById,
//   updateTask,
//   deleteTask,
// };
