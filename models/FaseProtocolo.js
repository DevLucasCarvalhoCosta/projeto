// models/FaseProtocolo.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const FaseProtocolo = sequelize.define('FaseProtocolo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('pendente', 'em_andamento', 'concluido'),
      allowNull: false,
      defaultValue: 'pendente'
    }
  });
  
  module.exports = FaseProtocolo;
  