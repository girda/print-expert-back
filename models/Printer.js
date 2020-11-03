const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.sequelize.define(
    'printers',
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        c_printer_id: {
          type: Sequelize.INTEGER
        },
        location_id: {
            type: Sequelize.INTEGER
        },
        department_id: {
            type: Sequelize.INTEGER
        },
        ip: {
            type: Sequelize.STRING
        },
        client_id: {
            type: Sequelize.INTEGER
        },
        model: {
            type: Sequelize.STRING
        },
        serialnumber: {
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
