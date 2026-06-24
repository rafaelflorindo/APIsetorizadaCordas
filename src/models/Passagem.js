const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Passagem = sequelize.define('Passagem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  tipo: {
    type: DataTypes.ENUM('LICAO', 'HINO'),
    allowNull: false
  },
  numero: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tom: {
    type: DataTypes.ENUM(
      'DÓ', 'DÓ#', 'RÉ', 'MÍB', 'RÉ#', 'MI', 'FÁ', 'FÁ#', 'SOL', 'SOL#', 'LÁB', 'LÁ', 'SI', 'SÍB'
    ),
    allowNull: true
  },
  observacao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  dataPassagem: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

module.exports = Passagem;