const ConnectionCWW = require('./models/ConnectionCWW');
const controllerPrinter = require('./controllers/printers');
const httpRequest = require('./util/httpRequest');
const util = require('./config/keys');

module.exports = () => {
    console.log('run connection');
    ConnectionCWW.findAll().then(connections => {
        connections.forEach(connection => {
            const body = JSON.stringify({
                login: connection.login,
                password: connection.pswd
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

                    ConnectionCWW.update({status: util.statusSuccess}, {where: {id: connection.dataValues.id}});
                }
            };

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