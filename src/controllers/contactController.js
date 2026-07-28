const Contact = require('../models/Contact');

// GET /api/contact
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne();
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/contact  [Admin]
exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/contact/send  (รับข้อความจากฟอร์มหน้าเว็บ)
exports.sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }
    // TODO: ต่อกับ Nodemailer หรือ email service ตรงนี้
    console.log('📬 New message from:', name, email);
    res.json({ message: 'Message received! Thank you.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
