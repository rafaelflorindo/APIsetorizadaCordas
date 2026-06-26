const { Router } = require('express');
const router = Router();

const PassagemController = require('../controllers/PassagemController'); 

router.post('/', PassagemController.store);
router.get('/', PassagemController.index);

// NOVO: Rota para abrir a ficha de aula do aluno com o histórico de lições/hinos
router.get('/aluno/:aluno_id', PassagemController.getHistoricoAluno);

router.get('/:id', PassagemController.show);
router.put('/:id', PassagemController.update);
router.delete('/:id', PassagemController.delete);
router.patch('/:id/activate', PassagemController.activate);

module.exports = router;