const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name:         { type: String, required: true },
  title:        { type: String, required: true },
  bio:          { type: String, required: true },
  profileImage: { type: String, default: '' },
  gpa:          { type: Number, default: 0 },
  university:   { type: String, default: '' },
  faculty:      { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);
