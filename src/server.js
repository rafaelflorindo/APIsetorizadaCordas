require('dotenv').config();
const express = require('express');
const routes = require('./routers');
const sequelize = require('./config/database');
// Importa o indexizador que configura todos os modelos e relacionamentos
require('./models/Index');
// Importa os models para garantir que o Sequelize os conheça na sincronização
require('./models/Usuario');

const app = express();

// Middlewares obrigatórios
app.use(express.json());

// Carrega o hub de rotas
app.use('/api', routes);

const PORT = process.env.PORT || 3000;

// Autentica e sincroniza o banco de dados antes de subir o servidor
sequelize.sync({ alter: true }) // Atualiza as tabelas se houver modificações nos models
  .then(() => {
    console.log('📦 Banco de dados conectado e sincronizado com sucesso.');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT} (http://localhost:${PORT}/api)`);
    });
  })
  .catch((error) => {
    console.error('❌ Erro ao conectar ao banco de dados:', error);
  });