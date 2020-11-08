const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.sequelize.define(
    'printer_data',
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        printer_id: {
          type: Sequelize.INTEGER
        },
        data: {
            type: Sequelize.DATE
        },
        status_id: {
            type: Sequelize.INTEGER
        },
        CountBk: {
            type: Sequelize.INTEGER
        },
        CountCol: {
            type: Sequelize.INTEGER
        },
        TonBk: {
            type: Sequelize.INTEGER
        },
        TonCn: {
            type: Sequelize.INTEGER
        },
        TonMg: {
            type: Sequelize.INTEGER
        },
        TonYl: {
            type: Sequelize.INTEGER
        },
        QtyBk: {
            type: Sequelize.INTEGER
        },
        QtyCn: {
            type: Sequelize.INTEGER
        },
        QtyMg: {
            type: Sequelize.INTEGER
        },
        QtyYl: {
            type: Sequelize.INTEGER
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
