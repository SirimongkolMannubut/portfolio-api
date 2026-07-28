const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  techStack:   [{ type: String }],
  githubUrl:   { type: String, default: '' },
  figmaUrl:    { type: String, default: '' },
  liveUrl:     { type: String, default: '' },
  imageUrl:    { type: String, default: '' },
  order:       { type: Number, default: 0 },
  isActive:    { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
