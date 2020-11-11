const ConnectionCWW = require('./models/ConnectionCWW');
const controllerPrinter = require('./controllers/printers');
const httpRequest = require('./util/httpRequest');
const util = require('./config/keys');

module.exports = () => {

    ConnectionCWW.findAll().then(connections => {
        connections.forEach(connection => {
            // Функция создания принтеров в БД и обновления статуса
            const createPrinters = (printers) => {
                printers.forEach(printer => {
                    controllerPrinter.create(printer, connection.client_id, connection.id)
                        .then(printer => {
                            console.log(printer)
                        });
                });
                ConnectionCWW.update({status: util.statusSuccess}, {where: {id: connection.dataValues.id}});
            };

            const updateStatus = (status, message) => {
                ConnectionCWW.update(
                    {status, error: message},
                    {where: {id: connection.dataValues.id}}
                );
            };

            httpRequest(connection.ip, '/printers', createPrinters, updateStatus)

        })
    })
};
