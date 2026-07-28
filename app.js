require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const mongoose = require('mongoose');
const path     = require('path');
const fs       = require('fs');

const app = express();

// Ensure public and uploads directories exist
const uploadsDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Uploaded Files
app.use('/uploads', express.static(uploadsDir));

// Serve Static Assets from Public
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', express.static(path.join(__dirname, 'public/admin')));

// API Routes
app.use('/api/auth',         require('./src/routes/auth'));
app.use('/api/profile',      require('./src/routes/profile'));
app.use('/api/projects',     require('./src/routes/projects'));
app.use('/api/skills',       require('./src/routes/skills'));
app.use('/api/activities',   require('./src/routes/activities'));
app.use('/api/certificates', require('./src/routes/certificates'));
app.use('/api/contact',      require('./src/routes/contact'));
app.use('/api/upload',       require('./src/routes/upload'));

// Serve Admin Dashboard for Root (/) and /admin routes
app.get(['/', '/admin*'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public/admin/index.html'));
});

// Port configuration
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (MONGO_URI) {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log('✅ MongoDB connected successfully');
    })
    .catch((err) => {
      console.error('⚠️  MongoDB connection warning:', err.message);
    });
} else {
  console.warn('⚠️  MONGO_URI environment variable is not defined.');
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
