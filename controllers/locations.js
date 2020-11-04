const Location = require('../models/Location');
const errorHandler = require('../util/errorHandler');

module.exports = (req, res) => {
    try {
        Location.findAll({where: {client_id: req.params.id}}).then(locations => {
            console.log(locations);
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
