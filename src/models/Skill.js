const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  level:    { type: Number, min: 0, max: 100, default: 50 },
  category: { type: String, enum: ['Web', 'Mobile', 'Database', 'Tools'], default: 'Web' },
  order:    { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Skill', SkillSchema);
