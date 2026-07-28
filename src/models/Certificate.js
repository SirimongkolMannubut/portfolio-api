const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  title:         { type: String, required: true },
  issuer:        { type: String, required: true },
  issueDate:     { type: String, default: '' },
  credentialUrl: { type: String, default: '' },
  imageUrl:      { type: String, default: '' },
  order:         { type: Number, default: 0 },
  isActive:      { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Certificate', CertificateSchema);
