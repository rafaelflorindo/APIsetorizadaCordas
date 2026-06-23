const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Setorizada = sequelize.define('Setorizada', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  data: {
    type: DataTypes.DATEONLY, // DATEONLY armazena apenas AAAA-MM-DD, sem o fuso horário
    allowNull: false
  },
  observacao: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

module.exports = Setorizada;