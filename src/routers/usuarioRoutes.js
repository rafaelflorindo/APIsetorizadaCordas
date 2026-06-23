const { Router } = require('express');
const router = Router();

// Rotas placeholder para o CRUD de Usuários
router.post('/', (req, res) => res.json({ message: 'POST Usuário - Criar' }));
router.get('/', (req, res) => res.json({ message: 'GET Usuários - Listar todos' }));
router.get('/:id', (req, res) => res.json({ message: `GET Usuário - Detalhes do ID ${req.params.id}` }));
router.put('/:id', (req, res) => res.json({ message: `PUT Usuário - Atualizar ID ${req.params.id}` }));
router.delete('/:id', (req, res) => res.json({ message: `DELETE Usuário - Remover ID ${req.params.id}` }));

module.exports = router;