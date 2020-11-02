const Sequelize = require('sequelize');
const optionsDB = require('./config/keys').databaseOptions;
const db = {};
const sequelize = new Sequelize(
    optionsDB.name, 
    optionsDB.login, 
    optionsDB.password, 
    {
        host: optionsDB.host,
        port: optionsDB.port,
        dialect: 'mysql',
        define: {
            timestamps: false
        },
        operatorsAliases: 0,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

db.sequelize = sequelize;

module.exports = db;