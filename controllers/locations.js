const Location = require('../models/Location');
const errorHandler = require('../util/errorHandler');

module.exports.getAll = (req, res) => {
    try {
        const where = JSON.parse(req.params.id);
        Location.findAll({where}).then(locations => {
            const resLocations = [];

            locations.forEach(location => {
                resLocations.push({id: location.id, name: location.name})
            });
            res.json(resLocations)
        })
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports.create = (req, res) => {
    try {
        console.log(req.body);
        const dataLocation = {
            name: req.body.name,
            cwwc_id: req.body.connection_id,
            client_id: req.body.client_id
        };

        Location.create(dataLocation).then(response => {
            console.log(response.dataValues);
            res.json({message: `Місто ${response.dataValues.name} успішно створено`})
        })
    } catch (error) {
        errorHandler(res, error);
    }

};
