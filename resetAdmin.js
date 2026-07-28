require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const Admin    = require('./src/models/Admin');

async function resetAdmin() {
  if (!process.env.MONGO_URI) {
    console.error('❌ MONGO_URI is missing in .env');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB Atlas');

  const username = 'admin';
  const newPassword = '1234';
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update existing admin or create new
  let admin = await Admin.findOne({ username });
  if (admin) {
    admin.password = hashedPassword;
    await admin.save();
    console.log(`✅ Reset password for admin user '${username}' to '${newPassword}' successfully!`);
  } else {
    admin = await Admin.create({ username, password: hashedPassword });
    console.log(`✅ Created new admin user '${username}' with password '${newPassword}' successfully!`);
  }

  await mongoose.disconnect();
}

resetAdmin().catch((err) => {
  console.error('❌ Error resetting admin:', err);
  process.exit(1);
});
