// controllers/authController.js

const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Assuming you create a user model later

// Sign up controller
const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Create user in Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // Optionally, store additional user data in MongoDB
    const newUser = new User({
      email: userRecord.email,
      firebaseUid: userRecord.uid,
      name:userRecord.name,
      password:userRecord.password,
      // other fields you want to store, like username, etc.
    });
    
    // await newUser.save();
    console.log('Saving user to DB...');
await newUser.save();
console.log('User saved.');

    res.status(201).json({
      message: 'User created successfully',
      uid: userRecord.uid,
      email: userRecord.email,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ message: error.message });
  }
};

// controllers/authController.js

const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Firebase Authentication login
      const user = await admin.auth().getUserByEmail(email);
      
      // Validate password (this can be optional if you're not storing passwords directly)
      // You'll need to hash password on signup and compare here if you choose to store passwords
      // const validPassword = await bcrypt.compare(password, storedPasswordHash);
  
      // For now, we'll authenticate with Firebase UID
      const token = await admin.auth().createCustomToken(user.uid);
  
      res.status(200).json({
        message: 'Login successful',
        token, // Send Firebase custom token to the client
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(400).json({ message: 'Invalid email or password' });
    }
  };
  
// controllers/authController.js

const logout = async (req, res) => {
    // Invalidate the user session by revoking refresh tokens (if needed)
    try {
      const { uid } = req.body; // Get UID from frontend or authentication token
  
      await admin.auth().revokeRefreshTokens(uid);
  
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(400).json({ message: error.message });
    }
  };
  
// controllers/authController.js

const getUser = async (req, res) => {
    const idToken = req.headers.authorization?.split(' ')[1]; // Extract the token from Authorization header
    
    if (!idToken) {
      return res.status(400).json({ message: 'No token provided' });
    }
  
    try {
      // Verify the Firebase ID token
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const user = await admin.auth().getUser(decodedToken.uid);
  
      res.status(200).json({
        message: 'User details fetched successfully',
        user: {
          email: user.email,
          uid: user.uid,
          // Add any other fields if necessary
        },
      });
    } catch (error) {
      console.error('Error getting user:', error);
      res.status(400).json({ message: 'Invalid token' });
    }
  };
  
  module.exports = {getUser, logout,login,signup};
//   module.exports = { logout };
//   module.exports = { login };
// module.exports = { signup };
