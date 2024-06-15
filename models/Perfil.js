const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Perfil = sequelize.define('Perfil', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  timestamps: true
});

module.exports = Perfil;
