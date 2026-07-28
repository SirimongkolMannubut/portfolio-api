const router = require('express').Router();
const auth   = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// POST /api/upload (Protected)
router.post('/', auth, (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message || 'File upload error' });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'Please select an image file to upload' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({
      message: 'Upload successful',
      filename: req.file.filename,
      url: fileUrl
    });
  });
});

module.exports = router;
