const express = require('express');
const multer = require('multer');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // stores locally

router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded or invalid file' });
  }

  console.log('File received:', req.file);
  res.status(200).json({ message: 'File received successfully!', file: req.file });
});

module.exports = router;
