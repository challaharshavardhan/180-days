//change at 04/12/2025
// middlewares/auth.js
const admin = require("firebase-admin");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }

    const idToken = authHeader.split("Bearer ")[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // Check if user exists in DB, else create
    let user = await User.findOne({ firebaseUid: decodedToken.uid });

    if (!user) {
      // Optionally get more user info from Firebase
      const firebaseUser = await admin.auth().getUser(decodedToken.uid);

      user = await User.create({
        firebaseUid: decodedToken.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName || '',
        password: 'firebase-auth', // ⚠️ placeholder, not used since Firebase handles auth
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
// const admin = require('firebase-admin');

// const authenticate = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader?.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     const decodedToken = await admin.auth().verifyIdToken(token);
//     req.user = {
//       _id: decodedToken.uid, // make sure this is _id for MongoDB
//       email: decodedToken.email,
//     };
//     next();
//   } catch (err) {
//     console.error('Auth error:', err);
//     res.status(401).json({ message: 'Invalid or expired token' });
//   }
// };

module.exports = authenticate;

