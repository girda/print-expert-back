const Printer = require('../models/Printer');
const PrinterData = require('../models/PrinterData');
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
            console.log('candidate');
            console.log(candidate.dataValues);


            const printerData = {
                printer_id: candidate.dataValues.id,
                CountBk: printer.CountBk,
                CountCol: printer.CountCol,
                TonBk: printer.TonBk,
                TonCn: printer.TonCn,
                TonMg: printer.TonMg,
                TonYl: printer.TonYl
            };

            PrinterData.create(printerData).then(printerData => {
                console.log(printerData.dataValues);
            });
        } else {
            const newPrinter = {
                c_printer_id: printer.c_printer_id,
                client_id: clientId,
                wwcc_id: cwwId
            };

            console.log('not candidate');
            console.log(newPrinter);
            await Printer.create(newPrinter).then(printer => {
                console.log(printer.dataValues.id);

                const printerData = {
                    printer_id: printer.dataValues.id,
                    CountBk: printer.CountBk,
                    CountCol: printer.CountCol,
                    TonBk: printer.TonBk,
                    TonCn: printer.TonCn,
                    TonMg: printer.TonMg,
                    TonYl: printer.TonYl
                };

                PrinterData.create(printerData).then(printerData => {
                    console.log(printerData.dataValues);
                })
            })
        }


    } catch (error) {
        console.log(error);
        errorHandler(res, error);
    }
};
