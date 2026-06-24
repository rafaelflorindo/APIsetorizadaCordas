require('dotenv').config();
const express = require('express');
const routes = require('./routers');
const sequelize = require('./config/database');
require('./models/Index');
require('./models/Usuario');

const app = express();

app.use(express.json());

app.use('/api', routes);

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }) 
  .then(() => {
    console.log('📦 Banco de dados conectado e sincronizado com sucesso.');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT} (http://localhost:${PORT}/api)`);
    });
  })
  .catch((error) => {
    console.error('❌ Erro ao conectar ao banco de dados:', error);
  });