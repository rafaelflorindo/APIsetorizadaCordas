const { Router } = require('express');
const usuarioRoutes = require('./usuarioRoutes');

const routes = Router();

// Injeta as rotas de usuários prefixadas com /usuarios
routes.use('/usuarios', usuarioRoutes);

module.exports = routes;