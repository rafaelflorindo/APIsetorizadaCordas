const { Router } = require('express');
const router = Router();

const SetorizadaController = require('../controllers/SetorizadaController'); 

router.post('/', SetorizadaController.store);
router.get('/', SetorizadaController.index);
router.get('/:id', SetorizadaController.show);
router.put('/:id', SetorizadaController.update);
router.delete('/:id', SetorizadaController.delete);
router.patch('/:id/activate', SetorizadaController.activate);

module.exports = router;