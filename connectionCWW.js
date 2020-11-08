const ConnectionCWW = require('./models/ConnectionCWW');
const controllerPrinter = require('./controllers/printers')

module.exports = () => {
    ConnectionCWW.findAll().then(connections => {

        connections.forEach(connection => {
            const fs = require('fs');

            let rawdata = fs.readFileSync('helpers/printers.json');
            let printers = JSON.parse(rawdata);

            console.log(connection.dataValues.ip);


            printers.forEach(printer => {
                controllerPrinter.create(printer, connection.client_id, connection.id)
            })
            
        })
    })
}