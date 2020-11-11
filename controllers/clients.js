const Client = require('../models/Client');
const ConnectionCWW = require('../models/ConnectionCWW');
const Printer = require('../models/Printer');
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

module.exports.remove = async (req, res) => {

    try {
        const connection = await ConnectionCWW.findOne({where: {client_id: req.params.id}});
        const printer = await Printer.findOne({where: {client_id: req.params.id}});

        if (connection || printer) {
            res.json({message: `Поточний об'єкт неможливо видалити, бо на нього посилаються інші об'єкти. Видаліть об'єкти які посилаються на нього та спробуйте ще.`});
        } else {
            await Client.destroy({where: {id: req.params.id}})
                .then(deletedRecord => {
                    res.json({message: `З'єднання IP успішно видалено`});
                })
        }
    } catch (error) {
        errorHandler(res, error);
    }
};
