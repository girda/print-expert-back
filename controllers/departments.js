const Department = require('../models/Departmen');
const errorHandler = require('../util/errorHandler');

module.exports.getAll = (req, res) => {
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

module.exports.create = (req, res) => {
    try {
        console.log(req.body);
        const dataDepartment = {
            name: req.body.name,
            location_id: req.body.location_id
        };

        Department.create(dataDepartment).then(response => {
            console.log(response.dataValues);
            res.json({message: `Відділ ${response.dataValues.name} успішно створено`})
        })
    } catch (error) {
        errorHandler(res, error);
    }

};
