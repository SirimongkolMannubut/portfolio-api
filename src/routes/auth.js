const router = require('express').Router();
const auth   = require('../middleware/authMiddleware');
const { login, setup, changePassword } = require('../controllers/authController');

router.post('/login',           login);
router.post('/setup',           setup);   // ใช้ครั้งแรกครั้งเดียว
router.post('/change-password', auth, changePassword);

module.exports = router;
