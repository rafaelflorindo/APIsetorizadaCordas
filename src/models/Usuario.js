const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  idade: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  batizado: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  telefone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  telefoneResponsavel: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  // --- Campos para Instrutores / Administrativo ---
  email: {
    type: DataTypes.STRING(100),
    allowNull: true,
    validate: {
      isEmail: true
    }
  },
  cpf: {
    type: DataTypes.STRING(14),
    allowNull: true
  },
  numeroRegistroInstrutor: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  // --- Endereço ---
  endereco: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  bairro: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  complemento: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  // --- Dados Musicais e Perfil ---
  instrumento: {
    type: DataTypes.ENUM('VIOLINO', 'VIOLA', 'VIOLONCELO', 'CONTRABAIXO'),
    allowNull: true
  },
  tipo: {
    type: DataTypes.ENUM('ALUNO', 'INSTRUTOR', 'ENCARREGADO LOCAL', 'ENCARREGADO REGIONAL'),
    allowNull: false
  },
  responsavelSetorizada: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  comumCongregacao: {
    type: DataTypes.STRING(200),
    allowNull: false,
    defaultValue: 'Conjunto Requião'
  },
  dataInicioGem: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  dataEncaminhamentoSetorizada: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  // --- Liberação para Ensaio ---
  dataLiberacaoEnsaio: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  liberadoEnsaio: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  // --- Histórico de Exames ---
  dataExameRjm: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  aprovadoRjm: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  dataExameCultoOficial: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  aprovadoCultoOficial: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  dataExameOficializacao: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  aprovadoOficializacao: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  // --- Status ---
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

module.exports = Usuario;