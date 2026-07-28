const router  = require('express').Router();
const auth    = require('../middleware/authMiddleware');
const ctrl    = require('../controllers/profileController');

router.get('/',  ctrl.getProfile);
router.put('/',  auth, ctrl.updateProfile);

module.exports = router;
