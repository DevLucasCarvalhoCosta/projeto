// logger.js

const Log = require('../models/Logs');


async function logAction(userId, action, details) {
  try {
    if (!userId) {
      throw new Error('userId é indefinido ou nulo');
    }

    // Crie um novo registro de log no banco de dados
    await Log.create({
      id_usuario: userId,
      acao: action,
      detalhes: details,
      data: new Date()
    });

    console.log(`Ação registrada com sucesso para o usuário ${userId}: ${action}`);
  } catch (error) {
    console.error('Erro ao registrar ação no log:', error.message);
    // Trate o erro conforme necessário
  }
}

module.exports = { logAction };
