const { Router } = require('express');
const router = Router();

const UsuarioController = require('../controllers/UsuarioController'); 

router.post('/', UsuarioController.store);
router.get('/', UsuarioController.index);
router.get('/:id', UsuarioController.show);
router.put('/:id', UsuarioController.update);
router.delete('/:id', UsuarioController.delete);
router.patch('/:id/activate', UsuarioController.activate);

module.exports = router;