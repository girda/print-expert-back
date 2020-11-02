const Client = require('../models/Client');

module.exports = (req, res) => {
    Client.findAll().then(clients => {
        const resClients = []

        clients.forEach(client => {
            resClients.push({id: client.id, name: client.name})
        })
        res.json(resClients)
    })
};
