const router = require('express').Router();
const auth   = require('../middleware/authMiddleware');
const ctrl   = require('../controllers/skillsController');

router.get('/',        ctrl.getSkills);
router.post('/',       auth, ctrl.createSkill);
router.put('/:id',     auth, ctrl.updateSkill);
router.delete('/:id',  auth, ctrl.deleteSkill);

module.exports = router;
