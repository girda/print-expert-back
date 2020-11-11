const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.sequelize.define(
    'cartridge_resources',
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
        SdrtBK: {
          type: Sequelize.INTEGER
        },
        SdrtCn: {
          type: Sequelize.INTEGER
        },
        SdrtMg: {
          type: Sequelize.INTEGER
        },
        SdrtYl: {
          type: Sequelize.INTEGER
        },
        date_start: {
          type: Sequelize.DATE
        },
        date_finish: {
          type: Sequelize.DATE
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
