const Location = require('../models/Location');

module.exports = (req, res) => {

    Location.findAll({where: {client_id: req.params.id}}).then(locations => {
        console.log(locations);
        const resLocations = [];

        locations.forEach(location => {
            resLocations.push({id: location.id, name: location.name})
        });
        res.json(resLocations)
    })
};
