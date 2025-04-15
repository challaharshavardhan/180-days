// controllers/progressController.js

const Task = require('../models/Task');
const getChessRole = require('../utils/getChessRole');

// GET /api/progress
const getProgress = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found' });
    }

    // Optional: Return progress of all tasks, not just one
    const progress = tasks.map((task) => ({
      taskId: task._id,
      title: task.title,
      tilePosition: task.tilePosition,
      role: getChessRole(task.tilePosition),
      status: task.status,
      lastProgressDate: task.lastProgressDate,
    }));

    res.status(200).json(progress);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch progress', error: err.message });
  }
};

// POST /api/progress
const updateProgress = async (req, res) => {
  const { taskId } = req.body;

  try {
    const task = await Task.findOne({ _id: taskId, userId: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const now = new Date();
    const last = task.lastProgressDate;
    const isSameDay =
      last &&
      now.getFullYear() === last.getFullYear() &&
      now.getMonth() === last.getMonth() &&
      now.getDate() === last.getDate();

    if (isSameDay) {
      return res.status(201).json({ message: 'Already updated today' });
    }

    task.tilePosition += 1;
    task.lastProgressDate = now;
    if (task.tilePosition >= 180) task.status = 'completed';

    await task.save();

    res.status(200).json({
      message: 'Progress updated',
      taskId: task._id,
      tilePosition: task.tilePosition,
      role: getChessRole(task.tilePosition),
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update progress', error: err.message });
  }
};

module.exports = { getProgress, updateProgress };
