const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Protocolo = require('./Protocolo'); // Importe o modelo Protocolo

const SessaoPlenaria = sequelize.define('SessaoPlenaria', {
  data: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('agendada', 'iniciada', 'concluida'),
    allowNull: false,
    defaultValue: 'agendada'
  }
});

// Defina a relação entre SessaoPlenaria e Protocolo (uma sessão plenária pode ter muitos protocolos)
SessaoPlenaria.hasMany(Protocolo, { as: 'protocolos', foreignKey: 'sessaoPlenariaId' });


module.exports = SessaoPlenaria;