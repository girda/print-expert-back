const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.sequelize.define(
    'clients',
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
        info: {
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
