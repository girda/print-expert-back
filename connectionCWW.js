const ConnectionCWW = require('./models/ConnectionCWW');
const controllerPrinter = require('./controllers/printers');
const httpRequest = require('./util/httpRequest');
const util = require('./config/keys');

module.exports = (where) => {
    console.log('run connection');
    ConnectionCWW.findAll({where: where}).then(connections => {
        connections.forEach(connection => {
            const body = JSON.stringify({
                login: connection.login,
                password: connection.pswd,
                limit_day: 30
            });
            // Функция создания принтеров в БД и обновления статуса
            const createPrinters = (data) => {
                console.log(data);
                if (data.status === 200) {
                    const printers = data.printers.value;
                    printers.forEach(printer => {
                        controllerPrinter.create(printer, connection.client_id, connection.id)
                            .then(printer => {
                                console.log(printer)
                            });
                    });
                    ConnectionCWW.update({status: util.statusConnectionSuccess, error: null}, {where: {id: connection.dataValues.id}});
                } else if (data.status === 206) {
                    const printers = data.printers.value;
                    printers.forEach(printer => {
                        controllerPrinter.create(printer, connection.client_id, connection.id)
                            .then(printer => {
                                console.log(printer)
                            });
                    });
                    ConnectionCWW.update({status: util.statusConnectionError, error: data.error.message}, {where: {id: connection.dataValues.id}});
                } else {
                    ConnectionCWW.update({status: util.statusConnectionError, error: data.error.message}, {where: {id: connection.dataValues.id}});
                }
            };

            // Обновление статуса в БД в случае ошибки
            const updateStatus = (status, message) => {
                ConnectionCWW.update(
                    {status, error: message},
                    {where: {id: connection.dataValues.id}}
                );
            };

            httpRequest(connection.ip, '/printers', createPrinters, updateStatus, 'POST', body)
        })
    })
};
