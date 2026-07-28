const router = require('express').Router();
const auth   = require('../middleware/authMiddleware');
const ctrl   = require('../controllers/contactController');

router.get('/',       ctrl.getContact);
router.put('/',       auth, ctrl.updateContact);
router.post('/send',  ctrl.sendMessage);

module.exports = router;
