const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Setorizada = sequelize.define('Setorizada', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  data: {
    type: DataTypes.DATEONLY, 
    allowNull: false
  },
  observacao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

module.exports = Setorizada;