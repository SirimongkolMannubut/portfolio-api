const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  title:        { type: String, required: true },
  organization: { type: String, required: true },
  period:       { type: String, required: true },
  description:  [{ type: String }],
  type:         { type: String, enum: ['internship', 'training', 'award', 'volunteer'], default: 'training' },
  order:        { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Activity', ActivitySchema);
