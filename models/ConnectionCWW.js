const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.sequelize.define(
    'cww_connections',
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING
        },
        ip: {
            type: Sequelize.STRING
        },
        login: {
            type: Sequelize.STRING
        },
        pswd: {
            type: Sequelize.STRING
        },
        client_id: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.INTEGER
        },
        error: {
            type: Sequelize.STRING
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
            type: Sequelize.DATE
        },
        reguser: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
);
