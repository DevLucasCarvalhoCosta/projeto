const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Perfil = require('./Perfil');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cargo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dataNascimento: {
    type: DataTypes.DATE,
    allowNull: false
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false
  },
  perfilId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Perfil,
      key: 'id'
    }
  }
}, {
  timestamps: true
});

// Definir a associação
Usuario.belongsTo(Perfil, { foreignKey: 'perfilId' });

module.exports = Usuario;
