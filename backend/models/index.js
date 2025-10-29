const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('projekt_inzynierka', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

sequelize.authenticate()
    .then(() => console.log('Połączono z bazą PostgreSQL!'))
    .catch(err => console.error('Błąd połączenia:', err));

module.exports = sequelize;
