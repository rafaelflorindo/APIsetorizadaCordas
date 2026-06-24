const { Router } = require('express');
const router = Router();

const PassagemController = require('../controllers/PassagemController'); 

router.post('/', PassagemController.store);
router.get('/', PassagemController.index);
router.get('/:id', PassagemController.show);
router.put('/:id', PassagemController.update);
router.delete('/:id', PassagemController.delete);
router.patch('/:id/activate', PassagemController.activate);

module.exports = router;