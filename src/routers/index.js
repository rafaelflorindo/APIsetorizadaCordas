const { Router } = require('express');

const usuarioRoutes = require('./usuarioRoutes');
const setorizadaRoutes = require('./setorizadaRoutes');
const passagemRoutes = require('./passagemRoutes');
const presencaRoutes = require('./presencaRoutes');

const routes = Router();

routes.use('/usuarios', usuarioRoutes);
routes.use('/setorizadas', setorizadaRoutes);
routes.use('/passagens', passagemRoutes);
routes.use('/presencas', presencaRoutes); 

module.exports = routes;