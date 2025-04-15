// controllers/uploadController.js

const axios = require('axios');
const Task = require('../models/Task');

// In uploadController.js
const validateUpload = async (req, res) => {
  const { taskId } = req.body;
  if (!taskId) return res.status(400).json({ message: 'Missing taskId' });

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
    return res.status(400).json({ message: 'Task already updated today' });
  }

  return res.status(200).json({ message: 'Upload allowed' });
};

const uploadFile = async (req, res) => {
  const file = req.file;
  const { taskId } = req.body;

  if (!file) return res.status(400).json({ message: 'No file uploaded' });
  if (!taskId) return res.status(400).json({ message: 'Missing taskId' });

  try {

    // Get the task
    const task = await Task.findOne({ _id: taskId, userId: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

      // Generate the filename for S3
      const extension = file.originalname.split('.').pop();
      const safeFileName = `${Date.now()}_${req.user._id}.${extension}`;

      const uploadUrl = `path to aws-s3 bucket/${safeFileName}`;
      const response = await axios.put(uploadUrl, file.buffer, {
        headers: {
          'Content-Type': file.mimetype,
        },
      });

      const s3Url = uploadUrl.split('?')[0]; // Strips off query params if any

      task.fileUrl = s3Url;
      task.lastProgressDate = now;
      task.tilePosition += 1;
      if (task.tilePosition >= 180) task.status = 'completed';

      await task.save();
      res.status(200).json({ message: 'File uploaded & task updated', task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
};

module.exports = { uploadFile, validateUpload };
