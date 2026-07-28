const router = require('express').Router();
const auth   = require('../middleware/authMiddleware');
const ctrl   = require('../controllers/projectsController');

router.get('/',        ctrl.getProjects);
router.post('/',       auth, ctrl.createProject);
router.put('/:id',     auth, ctrl.updateProject);
router.delete('/:id',  auth, ctrl.deleteProject);

module.exports = router;
