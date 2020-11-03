const Printer = require('../models/Printer');

module.exports = (req, res) => {

    Printer.findAll({where: {department_id: req.params.id}}).then(printers => {
        console.log(printers);
        const resPrinters = [];

        printers.forEach(printer => {
            resPrinters.push({id: printer.id, name: printer.model})
        });
        res.json(resPrinters)
    })
};
