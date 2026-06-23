const { Usuario } = require('../models/Index');

module.exports = {
  // 1. Criar um novo utilizador (Aluno ou Instrutor)
  async store(req, res) {
    try {
      const { nome, telefone, instrumento, tipo } = req.body;

      // Validação simples obrigatória
      if (!nome || !tipo) {
        return res.status(400).json({ error: 'Nome e tipo são campos obrigatórios.' });
      }

      const usuario = await Usuario.create({ nome, telefone, instrumento, tipo });
      return res.status(201).json(usuario);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar utilizador.', details: error.message });
    }
  },

  // 2. Listar todos os utilizadores (com opção de filtrar por tipo, ex: /usuarios?tipo=ALUNO)
  async index(req, res) {
    try {
      const { tipo } = req.query;
      const filtro = { status: true }; // Traz apenas os ativos por padrão

      if (tipo) {
        filtro.tipo = tipo.toUpperCase();
      }

      const usuarios = await Usuario.findAll({ where: filtro });
      return res.json(usuarios);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar utilizadores.', details: error.message });
    }
  },

  // 3. Procurar um utilizador específico pelo ID
  async show(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return res.status(404).json({ error: 'Utilizador não encontrado.' });
      }

      return res.json(usuario);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao procurar utilizador.', details: error.message });
    }
  },

  // 4. Atualizar os dados de um utilizador
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, telefone, instrumento, tipo, status } = req.body;

      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return res.status(404).json({ error: 'Utilizador não encontrado.' });
      }

      await usuario.update({ nome, telefone, instrumento, tipo, status });
      return res.json(usuario);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar utilizador.', details: error.message });
    }
  },

  // 5. Eliminação Lógica (Soft Delete) - Altera apenas o status para false para preservar históricos
  async delete(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return res.status(404).json({ error: 'Utilizador não encontrado.' });
      }

      // Em sistemas pedagógicos, evitamos dar "Hard Delete" (remover a linha) para não quebrar históricos de passagens antigas
      await usuario.update({ status: false });
      return res.json({ message: 'Utilizador desativado com sucesso.' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao desativar utilizador.', details: error.message });
    }
  }
};