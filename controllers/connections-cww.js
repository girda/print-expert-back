const ConnectionCWW = require('../models/ConnectionCWW');
const Location = require('../models/Location');
const Printer = require('../models/Printer');
const errorHandler = require('../util/errorHandler');
const httpRequest = require('../util/httpRequest');
const util = require('../config/keys');

module.exports.getAll = (req, res) => {
    try {
        ConnectionCWW.findAll({where: {client_id: req.params.id}})
            .then(connections => {
                const resConnections = [];

                connections.forEach(connection => {
                    resConnections.push({
                        id: connection.id,
                        ip: connection.ip,
                        login: connection.login,
                        pswd: connection.pswd,
                        client_id: connection.client_id,
                        status: connection.status
                    })
                });
                res.json(resConnections)
            })
            .catch(error => {
                console.log(error)
            })
    } catch (error) {
        errorHandler(res, error);
    }

};

module.exports.create = (req, res) => {
    try {
        console.log(req.body);
        const dataConnection = {
            ip: req.body.name,
            login: req.body.login,
            pswd: req.body.password,
            client_id: req.body.client_id
        };
        ConnectionCWW.create(dataConnection)
            .then(response => {
                console.log(response.dataValues);

                httpRequest(response.dataValues.ip, '/printers',
                    () => {
                        ConnectionCWW.update({status: util.statusConnectionSuccess}, {where: {id: response.dataValues.id}});
                        console.log(`connecting ${response.dataValues.ip} successful`)
                    },
                    () => {
                        ConnectionCWW.update(
                            {status: util.statusConnectionError, error: 'Нет подключения к сервису'},
                            {where: {id: response.dataValues.id}}
                        );
                    }
                );

                res.json({message: `Підключення CWW "${response.dataValues.ip}" успішно створено`})
            })
            .catch(error => {
                console.log(error)
            })
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports.remove = async (req, res) => {

    try {
        const location = await Location.findOne({where: {cwwc_id: req.params.id}});
        const printer = await Printer.findOne({where: {cwwc_id: req.params.id}});

        if (location || printer) {
            res.json({message: `Поточний об'єкт неможливо видалити, бо на нього посилаються інші об'єкти. Видаліть об'єкти які посилаються на нього та спробуйте ще.`});
        } else {
            await ConnectionCWW.destroy({where: {id: req.params.id}})
                .then(deletedRecord => {
                    res.json({message: `З'єднання IP успішно видалено`});
                })
                .catch(error => {
                    console.log(error)
                })
        }
    } catch (error) {
        errorHandler(res, error);
    }
};
