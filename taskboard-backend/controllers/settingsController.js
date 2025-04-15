// controllers/settingsController.js

const User = require('../models/User');
const Task = require('../models/Task');

// PUT /api/settings — update user profile
const updateSettings = async (req, res) => {
  const updates = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User updated successfully',
      user: {
        _id: updatedUser._id,
        email: updatedUser.email,
        name: updatedUser.name,
        profileImage: updatedUser.profileImage,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update user', error: err.message });
  }
};

// DELETE /api/settings — delete user account + tasks
const deleteAccount = async (req, res) => {
  try {
    const userId = req.user._id;

    await Task.deleteMany({ userId });
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: 'User account and all tasks deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete account', error: err.message });
  }
};

module.exports = {
  updateSettings,
  deleteAccount,
};
