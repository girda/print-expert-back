const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.sequelize.define(
    'users',
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        login: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        role_id: {
            type: Sequelize.INTEGER
        },
        blocked: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        client_id: {
            type: Sequelize.INTEGER
        },
        name_full: {
            type: Sequelize.STRING
        },
        info: {
            type: Sequelize.STRING,
            defaultValue: 'blabla'
        },
        password: {
            type: Sequelize.STRING
        },
        temp_password: {
            type: Sequelize.STRING,
            defaultValue: '123'
        },
        filters: {
            type: Sequelize.STRING
        },
        token: {
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
