const { Passagem, Usuario } = require('../models/Index');

module.exports = {
  // 1. Criar uma nova Passagem (Vinculando Aluno e Instrutor)
  async store(req, res) {
    try {
      const { tipo, numero, tom, observacao, dataPassagem, aluno_id, instrutor_id } = req.body;

      if (!tipo || !numero || !dataPassagem || !aluno_id || !instrutor_id) {
        return res.status(400).json({ 
          error: 'Tipo, número, data da passagem, aluno_id e instrutor_id são campos obrigatórios.' 
        });
      }

      const passagem = await Passagem.create({ 
        tipo, 
        numero, 
        tom, 
        observacao, 
        dataPassagem, 
        aluno_id, 
        instrutor_id 
      });
      
      return res.status(201).json({
        message: 'Passagem registrada com sucesso!',
        passagem
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao registrar passagem.', details: error.message });
    }
  },

  // 2. Listar todas as Passagens (Trazendo os dados do Aluno e Instrutor juntos)
  async index(req, res) {
    try {
      const { tipo } = req.query;
      const filtro = { status: true };

      if (tipo) {
        filtro.tipo = tipo.toUpperCase();
      }

      const passagens = await Passagem.findAll({ 
        where: filtro,
        // O Sequelize busca automaticamente as informações do Usuário usando os apelidos (as) que você definiu
        include: [
          { model: Usuario, as: 'aluno', attributes: ['id', 'nome', 'instrumento'] },
          { model: Usuario, as: 'instrutor', attributes: ['id', 'nome'] }
        ]
      });
      
      return res.json({
        message: 'Passagens listadas com sucesso!',
        quantidade: passagens.length,
        passagens
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar as passagens.', details: error.message });
    }
  },

  // 3. Buscar uma Passagem específica pelo ID (Com os dados de quem tocou e quem avaliou)
  async show(req, res) {
    try {
      const { id } = req.params;
      const passagem = await Passagem.findByPk(id, {
        include: [
          { model: Usuario, as: 'aluno', attributes: ['id', 'nome', 'instrumento'] },
          { model: Usuario, as: 'instrutor', attributes: ['id', 'nome'] }
        ]
      });

      if (!passagem) {
        return res.status(404).json({ error: 'Passagem não encontrada.' });
      }

      return res.json({
        message: 'Passagem localizada com sucesso!',
        passagem
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao procurar passagem.', details: error.message });
    }
  },

  // 4. Atualizar os dados de uma Passagem
  async update(req, res) {
    try {
      const { id } = req.params;
      const { tipo, numero, tom, observacao, dataPassagem, status, aluno_id, instrutor_id } = req.body;

      const passagem = await Passagem.findByPk(id);

      if (!passagem) {
        return res.status(404).json({ error: 'Passagem não encontrada.' });
      }

      await passagem.update({ tipo, numero, tom, observacao, dataPassagem, status, aluno_id, instrutor_id });

      return res.json({
        message: 'Passagem atualizada com sucesso!',
        passagem
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar passagem.', details: error.message });
    }
  },

  // 5. Eliminação Lógica (Soft Delete)
  async delete(req, res) {
    try {
      const { id } = req.params;
      const passagem = await Passagem.findByPk(id);

      if (!passagem) {
        return res.status(404).json({ error: 'Passagem não encontrada.' });
      }

      await passagem.update({ status: false });
      
      return res.json({ 
        message: 'Passagem desativada com sucesso.',
        passagem: { id: passagem.id, tipo: passagem.tipo, numero: passagem.numero, status: false }
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao desativar passagem.', details: error.message });
    }
  },

  // 6. Reativação Lógica
  async activate(req, res) {
    try {
      const { id } = req.params;
      const passagem = await Passagem.findByPk(id);

      if (!passagem) {
        return res.status(404).json({ error: 'Passagem não encontrada.' });
      }

      if (passagem.status === true) {
        return res.status(400).json({ message: 'Esta passagem já está ativa.' });
      }

      await passagem.update({ status: true });

      return res.json({
        message: 'Passagem reativada com sucesso!',
        passagem
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao reativar passagem.', details: error.message });
    }
  }
};