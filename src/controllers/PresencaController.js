const { Presenca, Usuario, Setorizada } = require('../models/Index');

module.exports = {
  // 1. Registrar uma nova Presença (Vinculando Usuário e Setorizada)
  // 1. Registrar uma nova Presença (Evitando duplicidade)
  async store(req, res) {
    try {
      const { presente, usuario_id, setorizada_id } = req.body;

      if (!usuario_id || !setorizada_id) {
        return res.status(400).json({ 
          error: 'Os campos usuario_id e setorizada_id são obrigatórios.' 
        });
      }

      // NOVO: Verifica se este usuário já possui registro de presença nesta Setorizada
      const presencaExistente = await Presenca.findOne({
        where: { usuario_id, setorizada_id }
      });

      if (presencaExistente) {
        return res.status(400).json({ 
          error: 'Já existe um registro de presença/falta para este usuário nesta data.' 
        });
      }

      const presenca = await Presenca.create({ 
        presente, 
        usuario_id, 
        setorizada_id 
      });
      
      return res.status(201).json({
        message: 'Presença registrada com sucesso!',
        presenca
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao registrar presença.', details: error.message });
    }
  },

  // 2. Listar todas as presenças (Trazendo os dados do Usuário e da Setorizada)
  async index(req, res) {
    try {
      // É possível filtrar via Query se foi falta ou presença (ex: /presencas?presente=false)
      const { presente } = req.query;
      const filtro = {};

      if (presente !== undefined) {
        filtro.presente = presente === 'true';
      }

      const presencas = await Presenca.findAll({ 
        where: filtro,
        include: [
          { 
            model: Usuario, 
            as: 'usuario', 
            attributes: ['id', 'nome', 'instrumento', 'tipo'] 
          },
          { 
            model: Setorizada, 
            as: 'setorizada', 
            attributes: ['id', 'data', 'observacao'] 
          }
        ]
      });
      
      return res.json({
        message: 'Presenças listadas com sucesso!',
        quantidade: presencas.length,
        presencas
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar presenças.', details: error.message });
    }
  },

  // 3. Buscar os detalhes de uma presença específica pelo ID
  async show(req, res) {
    try {
      const { id } = req.params;
      const presenca = await Presenca.findByPk(id, {
        include: [
          { 
            model: Usuario, 
            as: 'usuario', 
            attributes: ['id', 'nome', 'instrumento', 'tipo'] 
          },
          { 
            model: Setorizada, 
            as: 'setorizada', 
            attributes: ['id', 'data', 'observacao'] 
          }
        ]
      });

      if (!presenca) {
        return res.status(404).json({ error: 'Registro de presença não encontrado.' });
      }

      return res.json({
        message: 'Presença localizada com sucesso!',
        presenca
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao procurar presença.', details: error.message });
    }
  },

  // 4. Atualizar os dados de um registro de presença (Mudar de falta para presente, ou alterar os vínculos)
  async update(req, res) {
    try {
      const { id } = req.params;
      const { presente, usuario_id, setorizada_id } = req.body;

      const presenca = await Presenca.findByPk(id);

      if (!presenca) {
        return res.status(404).json({ error: 'Registro de presença não encontrado.' });
      }

      await presenca.update({ presente, usuario_id, setorizada_id });

      return res.json({
        message: 'Presença atualizada com sucesso!',
        presenca
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar presença.', details: error.message });
    }
  },

  // 5. Exclusão Física do registro de presença
  // Nota: Como a tabela Presenca mapeia um evento pontual diário, se um registro foi feito errado
  // ou duplicado, costuma-se deletar a linha de vez (Hard Delete) em vez de desativar por status.
  async delete(req, res) {
    try {
      const { id } = req.params;
      const presenca = await Presenca.findByPk(id);

      if (!presenca) {
        return res.status(404).json({ error: 'Registro de presença não encontrado.' });
      }

      await presenca.destroy();
      
      return res.json({ 
        message: 'Registro de presença removido com sucesso do histórico.' 
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao remover presença.', details: error.message });
    }
  }
};