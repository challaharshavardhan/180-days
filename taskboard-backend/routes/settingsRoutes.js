// routes/settingsRoutes.js

const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');
const { updateSettings, deleteAccount } = require('../controllers/settingsController');

router.put('/', authenticate, updateSettings);
router.delete('/', authenticate, deleteAccount);

module.exports = router;
