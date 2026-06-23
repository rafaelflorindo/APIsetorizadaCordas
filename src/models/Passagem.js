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
    allowNull: true // Permanece null caso a passagem seja de uma Lição que não foca em uma tonalidade específica
  },
  observacao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  dataPassagem: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
});

module.exports = Passagem;