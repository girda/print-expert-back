const Printer = require('../models/Printer');
const errorHandler = require('../util/errorHandler');

module.exports = (req, res) => {
    try {
        Printer.findAll({where: {department_id: req.params.id}}).then(printers => {
            console.log(printers);
            const resPrinters = [];

            printers.forEach(printer => {
                resPrinters.push({id: printer.id, name: printer.model})
            });
            res.json(resPrinters)
        })
    } catch (error) {
        errorHandler(res, error);
    }
};
