// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { signup, login, logout, getUser} = require('../controllers/authController');

// Auth Routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/user', getUser);

module.exports = router;
