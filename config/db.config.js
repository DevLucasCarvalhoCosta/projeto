const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('projeto', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql'
});

// Função para sincronizar o banco de dados e lidar com erros
const syncDatabase = async () => {
  try {
    // Testa a conexão com o banco de dados
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Sincroniza os modelos com o banco de dados
    await sequelize.sync(); // Use { force: true } apenas em desenvolvimento para recriar tabelas

    console.log('All models were synchronized successfully.');
  } catch (error) {
    // Em caso de erro, imprime o erro no console
    console.error('Unable to connect to the database:', error);
  }
};

// Chama a função de sincronização ao iniciar a aplicação
syncDatabase();

// Exporta a instância do Sequelize para ser usada em outros lugares
module.exports = sequelize;