// routes/progressRoutes.js

const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');
const { getProgress, updateProgress } = require('../controllers/progressController');

router.get('/', authenticate, getProgress);
router.post('/', authenticate, updateProgress);

module.exports = router;
