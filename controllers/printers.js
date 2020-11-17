const Printer = require('../models/Printer');
const PrinterData = require('../models/PrinterData');
const Location = require('../models/Location');
const db = require("../db");
const errorHandler = require('../util/errorHandler');

module.exports.getAll = (req, res) => {
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

module.exports.create = async (printer, clientId, cwwId) => {
    try {
        const candidate = await Printer.findOne({where: {c_printer_id: printer.c_printer_id, client_id: clientId}});

        if (candidate) {
            console.log(candidate);
            updatePrinterData(candidate.dataValues.id, printer)
        } else {
            const newPrinter = {
                c_printer_id: printer.c_printer_id,
                client_id: clientId,
                cwwc_id: cwwId
            };

            console.log('not candidate');
            console.log(newPrinter);
            await Printer.create(newPrinter).then(p => {
                updatePrinterData(p.dataValues.id, printer)
            })
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports.update = (req, res) => {
    try {
        const printers = req.body;
        const updatePrinters = new Promise(resolve => {
            printers.forEach((printer, i) => {
                Location.findOne({where: {name: printer.location_name, cwwc_id: printer.cwwc_id}})
                    .then(location => {
                        const locationId = location.dataValues.id;
                        Printer.update(
                            {
                                SdrtBK: printer.cartridge_resource_bk,
                                SdrtCn: printer.cartridge_resource_cn,
                                SdrtMg: printer.cartridge_resource_mg,
                                SdrtYl: printer.cartridge_resource_yl,
                                location_id: locationId
                            },
                            {where: {id: printer.printer_id}}
                        );
                        if (printers.length- 1 === +i) {
                            resolve(true)
                        }
                    });
            })
        });

        updatePrinters.then(response => {
            res.json({message: 'Дані успішно збережені!'})
        })
    } catch (error) {
        errorHandler(res, error);
    }
    // console.log(req.body)
};

function updatePrinterData(id, printer) {
    const query = "CALL `sp_insert_data`(" + id + ", "
        + printer.countBk + ", "
        + printer.countCol + ","
        + printer.tonBk + ", "
        + printer.tonCn + ", "
        + printer.tonMg + ", "
        + printer.tonYl + ")";
    console.log(query);
    db.sequelize.query(query)
        .then(response => {
            console.log('response sp_insert_data');
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
}
