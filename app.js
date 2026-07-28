require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const mongoose = require('mongoose');
const path     = require('path');
const fs       = require('fs');

const app = express();

// Ensure public and uploads directories exist (safely catch read-only filesystem on Vercel)
const uploadsDir = path.join(__dirname, 'public/uploads');
try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
} catch (e) {
  // Ignore read-only filesystem errors on Vercel serverless
}

// Disable Mongoose command buffering globally for Serverless (Vercel)
mongoose.set('bufferCommands', false);

// Global caching for Vercel Serverless Function invocations
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI Environment Variable is missing in Vercel settings!');
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000,
    };
    cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((m) => {
      console.log('✅ MongoDB connected successfully');
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};

// Middleware to ensure DB connection before handling requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('⚠️ Database connection failed:', err.message);
    res.status(500).json({ message: 'Database Connection Error: ' + err.message });
  }
});

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Uploaded Files
app.use('/uploads', express.static(uploadsDir));
app.use('/uploads', express.static('/tmp'));

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

// Port configuration (only listen when running locally)
const PORT = process.env.PORT || 5000;
if (!process.env.VERCEL && require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports = app;
