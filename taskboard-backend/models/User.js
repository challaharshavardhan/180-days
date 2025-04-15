// models/User.js

const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      default: '',
      trim: true,
    },
    password: {
      type: String,
      required:true,
    },
    // Add other fields you need, such as profile picture, tasks, etc.
    profileImage: { type: String, }
  },
  {
    timestamps: true, // This will automatically add createdAt and updatedAt timestamps
  }
);

// Create and export the User model
const User = mongoose.model('User', userSchema, 'users');
module.exports = User;
