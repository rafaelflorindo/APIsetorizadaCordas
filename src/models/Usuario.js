
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
  telefone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  instrumento: {
    type: DataTypes.ENUM('VIOLINO', 'VIOLA', 'VIOLONCELO', 'CONTRABAIXO'),
    allowNull: true
  },
  tipo: {
    type: DataTypes.ENUM('ALUNO', 'INSTRUTOR'),
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

module.exports = Usuario;