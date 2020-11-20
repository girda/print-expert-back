const db = require("../db");
const errorHandler = require('../util/errorHandler');

module.exports = (req, res) => {
    try {
        const clientId = req.body.client;
        const locationId = req.body.location ? req.body.location.name : req.body.location;
        const departmentId = req.body.department ? req.body.department.id : req.body.department;
        // const printerId = req.body.printer ? req.body.printer.id : req.body.printer;
        const startDate = formatDate(req.body.range.start);
        const endDate = formatDate(req.body.range.end);
        let query = null;

        if (locationId) {
            query = "CALL `sp_printer_report`('" + startDate + "', '" + endDate + "', " + clientId + ",'" + locationId + "', " + departmentId + ")"
        } else {
            query = "CALL `sp_printer_report`('" + startDate + "', '" + endDate + "', " + clientId + "," + locationId + ", " + departmentId + ")"
        }

        db.sequelize.query(query)
            .then(response => {
                const tableData = [];
                response.forEach(row => {
                    tableData.push({
                        printer_id: row.printer_id,
                        cwwc_id: row.Cwwc_id,
                        client: row.Client,
                        location: row.Location,
                        location_id: row.Location_id,
                        department: row.Department,
                        model: row.model,
                        serial_number: row.serialnumber,
                        ip: null,
                        page_count: row.CountCol,
                        quantity_black: row.i_QtyBk,
                        quantity_cn: row.i_QtyCn,
                        quantity_mg: row.i_QtyMg,
                        quantity_yl: row.i_QtyYl,
                        average_coverage_bk: row.AvrCovBK + '%',
                        average_coverage_cn: row.AvrCovCn + '%',
                        average_coverage_mg: row.AvrCovMg + '%',
                        average_coverage_yl: row.AvrCovYl + '%',
                        average_coverage_all: row.AvrCovTotal + '%',
                        cartridge_resource_bk: row.SdrtBK,
                        cartridge_resource_cn: row.SdrtCn,
                        cartridge_resource_mg: row.SdrtMg,
                        cartridge_resource_yl: row.SdrtYl
                    })
                });
                res.json(tableData);
            })
            .error(error => {
                errorHandler(res, error);
            });
    } catch (error) {
        errorHandler(res, error);
    }
};

function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
