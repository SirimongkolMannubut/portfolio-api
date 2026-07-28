const router = require('express').Router();
const auth   = require('../middleware/authMiddleware');
const ctrl   = require('../controllers/activitiesController');

router.get('/',        ctrl.getActivities);
router.post('/',       auth, ctrl.createActivity);
router.put('/:id',     auth, ctrl.updateActivity);
router.delete('/:id',  auth, ctrl.deleteActivity);

module.exports = router;
