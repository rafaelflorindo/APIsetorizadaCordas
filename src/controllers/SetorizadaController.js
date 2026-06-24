const { Setorizada } = require('../models/Index');

module.exports = {
  async store(req, res) {
    try {
      const { data, observacao } = req.body;

      if (!data) {
        return res.status(400).json({ error: 'A data é um campo obrigatório.' });
      }

      const setorizada = await Setorizada.create({ data, observacao });
      
      return res.status(201).json({
        message: 'Setorizada criada com sucesso!',
        setorizada
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar Setorizada.', details: error.message });
    }
  },

  // 2. Listar todos os Setorizadaes
  async index(req, res) {
    try {
      const { observacao } = req.query;
      const filtro = { status: true };

      if (observacao) {
        filtro.observacao = observacao.toUpperCase();
      }

      const setorizadas = await Setorizada.findAll({ where: filtro });
      
      return res.json({
        message: 'Setorizadas listadas com sucesso!',
        quantidade: setorizadas.length,
        setorizadas
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar as setorizadaes.', details: error.message });
    }
  },

  // 3. Procurar um Setorizada específico pelo ID
  async show(req, res) {
    try {
      const { id } = req.params;
      const setorizada = await Setorizada.findByPk(id);

      if (!setorizada) {
        return res.status(404).json({ error: 'Setorizada não encontrado.' });
      }

      return res.json({
        message: 'Setorizada localizado com sucesso!',
        setorizada
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao procurar Setorizada.', details: error.message });
    }
  },

  // 4. Atualizar os dados de um Setorizada
  async update(req, res) {
    try {
      const { id } = req.params;
      const { data, observacao, status } = req.body;

      const setorizada = await Setorizada.findByPk(id);

      if (!setorizada) {
        return res.status(404).json({ error: 'Setorizada não encontrado.' });
      }

      await setorizada.update({ data, observacao, status });

      return res.json({
        message: 'Dados do Setorizada atualizados com sucesso!',
        setorizada
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar Setorizada.', details: error.message });
    }
  },

  // 5. Eliminação Lógica (Soft Delete)
  async delete(req, res) {
    try {
      const { id } = req.params;
      const setorizada = await Setorizada.findByPk(id);

      if (!setorizada) {
        return res.status(404).json({ error: 'Setorizada não encontrado.' });
      }

      await setorizada.update({ status: false });
      
      return res.json({ 
        message: 'Setorizada desativada com sucesso.',
        setorizada: { id: setorizada.id, data: setorizada.data, status: false }
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao desativar Setorizada.', details: error.message });
    }
  },

  // 6. Reativação Lógica - Altera o status de volta para true
  async activate(req, res) {
    try {
      const { id } = req.params;
      
      // Buscamos o usuário (mesmo que ele esteja com status: false)
      const setorizada = await Setorizada.findByPk(id);

      if (!setorizada) {
        return res.status(404).json({ error: 'Setorizada não encontrado.' });
      }

      // Se o usuário já estiver ativo, podemos avisar
      if (setorizada.status === true) {
        return res.status(400).json({ message: 'Esta Setorizada já está ativo.' });
      }

      // Altera o status para true
      await setorizada.update({ status: true });

      return res.json({
        message: 'Setorizada reativada com sucesso!',
        setorizada
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao reativar Setorizada.', details: error.message });
    }
  }
  
};