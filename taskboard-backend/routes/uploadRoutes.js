// routes/uploadRoutes.js

const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const { uploadFile, validateUpload } = require('../controllers/uploadController');

// Authenticated file upload route
router.post('/', authenticate, upload.single('file'), uploadFile);
router.post('/validate', authenticate, validateUpload);

module.exports = router;
