const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Presenca = sequelize.define('Presenca', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  presente: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

module.exports = Presenca;