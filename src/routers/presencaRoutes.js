const { Router } = require('express');
const router = Router();

const PresencaController = require('../controllers/PresencaController'); 

router.post('/', PresencaController.store);
router.get('/', PresencaController.index);
router.get('/:id', PresencaController.show); 
router.put('/:id', PresencaController.update); 
router.delete('/:id', PresencaController.delete);

module.exports = router;