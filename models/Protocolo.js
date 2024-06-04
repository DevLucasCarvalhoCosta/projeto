const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Protocolo = sequelize.define('Protocolo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  numero: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  assunto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  conteudo: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  dataCriacao: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW // Define o valor padrão como a data/hora atual
  },
  statusVotacao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pdfPath: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Protocolo;