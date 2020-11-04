const Department = require('../models/Departmen');
const errorHandler = require('../util/errorHandler');

module.exports = (req, res) => {
    try {
        Department.findAll({where: {location_id: req.params.id}}).then(departments => {
            console.log(departments.dataValues);
            const resDepartments = [];

            departments.forEach(department => {
                resDepartments.push({id: department.id, name: department.name})
            });
            res.json(resDepartments)
        })
    } catch (error) {
        errorHandler(res, error);
    }
};
