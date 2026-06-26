const { Usuario } = require('../models/Index');

module.exports = {
  // 1. Criar um novo utilizador (Aluno ou Instrutor)
  async store(req, res) {
    try {
      const { 
        nome, idade, batizado, telefone, telefoneResponsavel,
        email, cpf, numeroRegistroInstrutor,
        endereco, bairro, complemento,
        instrumento, tipo, responsavelSetorizada, comumCongregacao,
        dataInicioGem, dataEncaminhamentoSetorizada,
        dataLiberacaoEnsaio, liberadoEnsaio,
        dataExameRjm, aprovadoRjm,
        dataExameCultoOficial, aprovadoCultoOficial,
        dataExameOficializacao, aprovadoOficializacao
      } = req.body;

      if (!nome || !tipo) {
        return res.status(400).json({ error: 'Nome e tipo são campos obrigatórios.' });
      }

      const usuario = await Usuario.create({ 
        nome, idade, batizado, telefone, telefoneResponsavel,
        email, cpf, numeroRegistroInstrutor,
        endereco, bairro, complemento,
        instrumento, tipo, responsavelSetorizada, comumCongregacao,
        dataInicioGem, dataEncaminhamentoSetorizada,
        dataLiberacaoEnsaio, liberadoEnsaio,
        dataExameRjm, aprovadoRjm,
        dataExameCultoOficial, aprovadoCultoOficial,
        dataExameOficializacao, aprovadoOficializacao
      });
      
      return res.status(201).json({
        message: 'Utilizador criado com sucesso!',
        usuario
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar utilizador.', details: error.message });
    }
  },

  // 2. Listar todos os utilizadores
  async index(req, res) {
    try {
      const { tipo } = req.query;
      const filtro = { status: true };

      if (tipo) {
        filtro.tipo = tipo.toUpperCase();
      }

      const usuarios = await Usuario.findAll({ where: filtro, order: [['nome', 'ASC']] });
      
      return res.json({
        message: 'Utilizadores listados com sucesso!',
        quantidade: usuarios.length,
        usuarios
      });
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

      return res.json({
        message: 'Utilizador localizado com sucesso!',
        usuario
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao procurar utilizador.', details: error.message });
    }
  },

  // 4. Atualizar os dados de um utilizador
  async update(req, res) {
    try {
      const { id } = req.params;
      const { 
        nome, idade, batizado, telefone, telefoneResponsavel,
        email, cpf, numeroRegistroInstrutor,
        endereco, bairro, complemento,
        instrumento, tipo, responsavelSetorizada, comumCongregacao,
        dataInicioGem, dataEncaminhamentoSetorizada,
        dataLiberacaoEnsaio, liberadoEnsaio,
        dataExameRjm, aprovadoRjm,
        dataExameCultoOficial, aprovadoCultoOficial,
        dataExameOficializacao, aprovadoOficializacao,
        status 
      } = req.body;

      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return res.status(404).json({ error: 'Utilizador não encontrado.' });
      }

      await usuario.update({ 
        nome, idade, batizado, telefone, telefoneResponsavel,
        email, cpf, numeroRegistroInstrutor,
        endereco, bairro, complemento,
        instrumento, tipo, responsavelSetorizada, comumCongregacao,
        dataInicioGem, dataEncaminhamentoSetorizada,
        dataLiberacaoEnsaio, liberadoEnsaio,
        dataExameRjm, aprovadoRjm,
        dataExameCultoOficial, aprovadoCultoOficial,
        dataExameOficializacao, aprovadoOficializacao,
        status 
      });

      return res.json({
        message: 'Dados do utilizador atualizados com sucesso!',
        usuario
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar utilizador.', details: error.message });
    }
  },

  // 5. Eliminação Lógica (Soft Delete)
  async delete(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return res.status(404).json({ error: 'Utilizador não encontrado.' });
      }

      await usuario.update({ status: false });
      
      return res.json({ 
        message: 'Utilizador desativado com sucesso.',
        usuario: { id: usuario.id, nome: usuario.nome, status: false }
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao desativar utilizador.', details: error.message });
    }
  },

  // 6. Reativação Lógica
  async activate(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return res.status(404).json({ error: 'Utilizador não encontrado.' });
      }

      if (usuario.status === true) {
        return res.status(400).json({ message: 'Este utilizador já está ativo.' });
      }

      await usuario.update({ status: true });

      return res.json({
        message: 'Utilizador reativado com sucesso!',
        usuario
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao reativar utilizador.', details: error.message });
    }
  }
};