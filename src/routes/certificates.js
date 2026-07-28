const router = require('express').Router();
const auth   = require('../middleware/authMiddleware');
const ctrl   = require('../controllers/certificatesController');

router.get('/',        ctrl.getCertificates);
router.post('/',       auth, ctrl.createCertificate);
router.put('/:id',     auth, ctrl.updateCertificate);
router.delete('/:id',  auth, ctrl.deleteCertificate);

module.exports = router;
