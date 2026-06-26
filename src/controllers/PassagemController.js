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
        tipo: tipo.toUpperCase(), // Garante consistência ('LICAO' ou 'HINO')
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

  // NEW: 2. Buscar histórico específico de um Aluno para o momento da aula
  // Rota sugerida: GET /passagens/aluno/:aluno_id
  async getHistoricoAluno(req, res) {
    try {
      const { aluno_id } = req.params;

      // Busca todas as passagens ativas do aluno, ordenadas pela data e ID mais recentes
      const passagens = await Passagem.findAll({
        where: { 
          aluno_id,
          status: true 
        },
        include: [
          { model: Usuario, as: 'instrutor', attributes: ['id', 'nome'] }
        ],
        order: [
          ['dataPassagem', 'DESC'],
          ['id', 'DESC']
        ]
      });

      // Separa o array de forma limpa para facilitar a renderização no seu Frontend
      const licoes = passagens.filter(p => p.tipo === 'LICAO');
      const hinos = passagens.filter(p => p.tipo === 'HINO');

      return res.json({
        message: 'Histórico do aluno recuperado com sucesso!',
        resumo: {
          ultimaLicao: licoes[0] || null, // A lição mais recente no topo
          ultimoHino: hinos[0] || null    // O hino mais recente no topo
        },
        historico: {
          licoes,
          hinos
        }
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao carregar histórico do aluno.', details: error.message });
    }
  },

  // 3. Listar todas as Passagens gerais do sistema (Geral)
  async index(req, res) {
    try {
      const { tipo } = req.query;
      const filtro = { status: true };

      if (tipo) {
        filtro.tipo = tipo.toUpperCase();
      }

      const passagens = await Passagem.findAll({ 
        where: filtro,
        include: [
          { model: Usuario, as: 'aluno', attributes: ['id', 'nome', 'instrumento'] },
          { model: Usuario, as: 'instrutor', attributes: ['id', 'nome'] }
        ],
        order: [['dataPassagem', 'DESC']]
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

  // 4. Buscar uma Passagem específica pelo ID
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

  // 5. Atualizar os dados de uma Passagem
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
        message: 'Passagem updated com sucesso!',
        passagem
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar passagem.', details: error.message });
    }
  },

  // 6. Eliminação Lógica (Soft Delete)
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

  // 7. Reativação Lógica
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