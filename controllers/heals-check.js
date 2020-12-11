const errorHandler = require('../util/errorHandler');

module.exports.get = (req, res) => {
    try {
        res.status(200).json({success: true});

    } catch (error) {
        errorHandler(res, error)
    }

};
