const errorHandler = require('../util/errorHandler');
const ConnectionCWW = require('../models/ConnectionCWW');

module.exports.get = (req, res) => {
    try {
        ConnectionCWW.findAll({where: {status: 0}})
            .then(connections => {
                console.log(connections);
                res.status(200).json(connections);

            })
            .catch(error => {
                errorHandler(res, error)
            });

    } catch (error) {
        errorHandler(res, error)
    }

};
