const sequelize = require('./db.config');

function connectWithRetry() {
  return sequelize.authenticate()
    .then(() => {
      console.log('Connected to the database');
    })
    .catch(err => {
      console.error('Error connecting to the database:', err);
      setTimeout(connectWithRetry, 2000); // Retry connection after 2 seconds
    });
}

sequelize.connectionManager.on('disconnected', connectWithRetry);

connectWithRetry();

module.exports = sequelize;