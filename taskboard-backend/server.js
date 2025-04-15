const admin = require('firebase-admin');
const serviceAccount = require('keep path to your firebase service acnt'); // Path to your Firebase service account JSON file
const authRoutes = require('./routes/authRoutes');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const uploadRoutes = require('./routes/uploadRoutes');
const progressRoutes = require('./routes/progressRoutes');
// const uploadTestRoutes = require('./routes/uploadTestRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
// const cors = require('cors');
// const uploadTestRoutes = require('./routes/uploadTestRoutes');
const taskRoutes = require('./routes/taskRoutes');
require('dotenv').config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),  
});

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("MongoDB connected");
      console.log("bucketname:", `${process.env.AWS_BUCKET_NAME}`);
    } catch (err) {
      console.error("MongoDB connection error:", err);
    }
  };
  
  connectDB(); // Call the async function to connect to the database
  
  // Sample route
  app.get("/", (req, res) => {
    res.send("Backend is running!");
  });
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 
app.use('/api/tasks', require('./routes/taskRoutes'));

// Use the auth routes
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/settings', settingsRoutes);
// app.use(cors({ origin: 'http://localhost:3000' }));

