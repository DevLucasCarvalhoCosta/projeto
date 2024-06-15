'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config'); // Corrigindo a importação do Sequelize

module.exports = sequelize.define('Log', {
  id: {
    type: DataTypes.INTEGER, // Alterando para DataTypes.INTEGER
    primaryKey: true,
    autoIncrement: true
  },
  id_usuario: {
    type: DataTypes.INTEGER, // Alterando para DataTypes.INTEGER
    allowNull: false
  },
  acao: {
    type: DataTypes.STRING, // Alterando para DataTypes.STRING
    allowNull: false
  },
  detalhes: {
    type: DataTypes.TEXT, // Alterando para DataTypes.TEXT
    allowNull: true
  },
  data: {
    type: DataTypes.DATE, // Alterando para DataTypes.DATE
    allowNull: false
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
});
