const Location = require('../models/Location');
const Department = require('../models/Department');
const errorHandler = require('../util/errorHandler');
const Sequelize = require('sequelize');

module.exports.getAll = async (req, res) => {
    try {

        const where = JSON.parse(req.params.id);

        let getLocations;
        console.log(where)

        if (where.distinct) {
            delete where.distinct;
            getLocations = Location.findAll({
                attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('name')), 'name']],
                where
            })
        } else {
            delete where.distinct;
            getLocations = Location.findAll({where})
        }
        getLocations
            .then(locations => {
                const resLocations = [];
                console.log(locations.locations);
                locations.forEach(location => {
                    resLocations.push({id: location.id, name: location.name, cwwc_id: location.cwwc_id})
                });
                res.json(resLocations)
            })
            .catch(error => {
                console.log(error)
            })
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports.create = async (req, res) => {
    try {
        console.log(req.body);
        const dataLocation = {
            name: req.body.name,
            cwwc_id: req.body.connection_id,
            client_id: req.body.client_id
        };
        // console.log(dataLocation.dataValues)
        await Location.create(dataLocation)
            .then(response => {
                console.log(response.dataValues);
                res.json({message: `Місто "${response.dataValues.name}" успішно створено`})
            })
            .catch(error => {
                console.log(error)
            })

    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports.remove = async (req, res) => {
    try {
        const department = await Department.findOne({where: {location_id: req.params.id}});
        if (department) {
            res.json({message: `Поточний об'єкт неможливо видалити, бо на нього посилаються інші об'єкти. Видаліть об'єкти які посилаються на нього та спробуйте ще.`});
        } else {
            await Location.destroy({where: {id: req.params.id}})
                .then(deletedRecord => {
                    res.json({message: `Місто успішно видалено`});
                })
                .catch(error => {
                    console.log(error)
                })
        }
    } catch (error) {
        errorHandler(res, error);
    }
};
