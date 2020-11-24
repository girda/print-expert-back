const User = require('../models/User');
const errorHandler = require('../util/errorHandler');

module.exports.get = (req, res) => {
    try {
        User.findOne({where: {id: req.params.id}})
            .then(user => {
                console.log(user.dataValues.filters);
                res.json(user.dataValues.filters)
            })
            .catch(error => {
                console.log(error)
            })
    } catch (error) {
        errorHandler(res, error);
    }

};

module.exports.update = (req, res) => {
    try {
        User.update(
            {filters: JSON.stringify(req.body)},
            {where: {id: req.params.id}}
        ).then(response => {
            res.json({message: 'successful'})
        })
    } catch (error) {
        errorHandler(res, error);
    }
};
