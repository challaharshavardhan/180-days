// models/Task.js

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    fileUrl: {
      type: String,
      default: '',
    },
    tilePosition: {
      type: Number,
      default: 1, // Starts at tile 1
    },
    status: {
      type: String,
      enum: ['in-progress', 'completed'],
      default: 'in-progress',
    },
    lastProgressDate: {
      type: Date,
      default: null, // Used for 24hr rule
    },
    userId: {
      type: String,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
