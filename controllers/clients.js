const Client = require('../models/Client');
const errorHandler = require('../util/errorHandler');

module.exports.getAll = (req, res) => {
    try {
        Client.findAll().then(clients => {
            const resClients = [];

            clients.forEach(client => {
                resClients.push({id: client.id, name: client.name})
            });
            res.json(resClients)
        })
    } catch (error) {
        errorHandler(res, error);
    }

};

module.exports.create = (req, res) => {
    try {
        console.log(req.body);
        const dataClient = {name: req.body.name};

        Client.create(dataClient).then(response => {
            console.log(response.dataValues);
            res.json({message: `Кліент "${response.dataValues.name}" успішно створений`})
        })
    } catch (error) {
        errorHandler(res, error);
    }

};
