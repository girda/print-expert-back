const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.sequelize.define(
    'settings',
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
        hh: {
            type: Sequelize.INTEGER
        },
        mm: {
            type: Sequelize.INTEGER
        },
        error_status: {
            type: Sequelize.INTEGER
        },
        error_descr: {
            type: Sequelize.STRING
        },
        exec_status: {
            type: Sequelize.INTEGER
        },
        period: {
            type: Sequelize.INTEGER
        }

        // createdAt: {
        //     type: Sequelize.DATE
        // },
        // updatedAt: {
        //     type: Sequelize.DATE
        // },
        // reguser: {
        //     type: Sequelize.STRING
        // }
    },
    {
        timestamps: false
    }
);
