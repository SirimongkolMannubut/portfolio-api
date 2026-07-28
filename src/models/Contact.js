const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  phone:    { type: String, default: '' },
  email:    { type: String, default: '' },
  lineId:   { type: String, default: '' },
  github:   { type: String, default: '' },
  facebook: { type: String, default: '' },
  figmaUrl: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Contact', ContactSchema);
