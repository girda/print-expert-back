const Location = require('../models/Location');
const errorHandler = require('../util/errorHandler');
const Sequelize = require('sequelize');

module.exports.getAll = (req, res) => {
    try {
        const where = JSON.parse(req.params.id);
        let getLocations;

        if (where.client_id) {
            getLocations = Location.findAll({
                attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('name')), 'name']],
                where
            })
        } else {
            getLocations = Location.findAll({where})
        }
        getLocations.then(locations => {
            const resLocations = [];
            console.log(locations.locations)
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
        // console.log(dataLocation.dataValues)
        Location.create(dataLocation).then(response => {
            console.log(response.dataValues);
            res.json({message: `Місто "${response.dataValues.name}" успішно створено`})
        })
    } catch (error) {
        errorHandler(res, error);
    }

};
