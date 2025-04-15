// routes/taskRoutes.js
// console.log("ENV BASE URL:", import.meta.env.VITE_BACKEND_URL);
const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

// Protect all task routes
router.use(authenticate);

router.post('/', createTask);
router.get('/', getTasks);
router.get('/:taskId', getTaskById);
router.put('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);

module.exports = router;
