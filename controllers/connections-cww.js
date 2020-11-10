const ConnectionCWW = require('../models/ConnectionCWW');
const errorHandler = require('../util/errorHandler');
const httpRequest = require('../util/httpRequest');
const util = require('../config/keys');

module.exports.getAll = (req, res) => {
    try {
        ConnectionCWW.findAll({where: {client_id: req.params.id}}).then(connections => {
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
        }
        ConnectionCWW.create(dataConnection).then(response => {
            console.log(response.dataValues);

            httpRequest(response.dataValues.ip, '/printers',
                () => {
                    ConnectionCWW.update({status: util.statusSuccess}, {where: {id: response.dataValues.id}});
                    console.log(`connecting ${response.dataValues.ip} successful`)
                },
                () => {
                    ConnectionCWW.update(
                        {status: util.statusError, error: 'Нет подключения к сервису'},
                        {where: {id: connection.dataValues.id}}
                    );
                }
                );

            res.json({message: `Підключення CWW "${response.dataValues.ip}" успішно створено`})
        })
    } catch (error) {
        errorHandler(res, error);
    }

};
