const Department = require('../models/Department');
const Location = require('../models/Location');
const errorHandler = require('../util/errorHandler');

module.exports.getAll = (req, res) => {
    try {
        const where = JSON.parse(req.params.id);
        if (where.name) {
            console.log('departments')
            console.log(where)
            Location.findAll({where}).then(locations => {
                const locationIds = [];

                locations.forEach(location => {
                    locationIds.push(location.id)
                });

                console.log(locationIds);
                Department.findAll({where: {location_id: locationIds}}).then(departments => {
                    const resDepartments = [];

                    departments.forEach(department => {
                        resDepartments.push({id: department.id, name: department.name})
                    });
                    console.log(resDepartments);
                    res.json(resDepartments)
                })
            })
        } else {
            Department.findAll({where}).then(departments => {
                console.log(departments.locations);
                const resDepartments = [];

                departments.forEach(department => {
                    resDepartments.push({id: department.id, name: department.name, location_id: department.location_id})
                });
                res.json(resDepartments)
            })
        }

    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports.create = (req, res) => {
    try {
        console.log(req.body);
        const dataDepartment = {
            name: req.body.name,
            location_id: req.body.location_id,
            client_id: req.body.client_id
        };

        Department.create(dataDepartment).then(response => {
            console.log(response.dataValues);
            res.json({message: `Відділ "${response.dataValues.name}" успішно створено`})
        })
    } catch (error) {
        errorHandler(res, error);
    }

};

module.exports.remove = (req, res) => {
    try {
        Department.destroy({where: {id: req.params.id}})
            .then(deletedRecord => {
                res.json({message: `Відділ успішно видалено`});
            })
    } catch (error) {
        errorHandler(res, error);
    }
};
