const Settings = require('../models/Settings');
const keys = require('../config/keys');
const errorHandler = require('../util/errorHandler');
const connectionsCWW = require('../connectionCWW');
const setTimer = require('../util/setTimer');

module.exports.get = async (req, res) => {
    try {
        Settings.findAll().then(settings => {
            console.log(settings);
            res.json(settings)
        })

    } catch (error) {
        errorHandler(res, error);
    }

};
module.exports.start = async (req, res) => {
    try {
        await Settings.update(
            {exec_status: keys.statusStartTimer},
            {where: {id: req.params.id}})
            .then(() => {

                Settings.findOne({where: {id: req.params.id}})
                    .then(setting => {
                        const startHour = setting.dataValues.hh;
                        const startMinutes = setting.dataValues.mm;
                        const periodTime = 1000 * 60 * 2; // 10 минут

                        setTimer(connectionsCWW, periodTime, startHour, startMinutes);
                        res.json(setting)
                    })
                    .catch(error => {
                        console.log(error)
                        errorHandler(res, error);
                    })
            });



    } catch (error) {
        errorHandler(res, error);
    }

};

module.exports.stop = async (req, res) => {
    try {
        Settings.update(
            {exec_status: keys.statusStopTimer},
            {where: {id: req.params.id}})
            .then(() => {

                if (global.timerInterval) {
                    clearInterval(global.timerInterval)
                } else if (global.timerTimeout) {
                    clearTimeout(global.timerTimeout)
                }
                Settings.findOne({where: {id: req.params.id}})
                    .then(setting => {
                        res.json(setting)
                    })
                    .catch(error => {
                        console.log(error);
                        errorHandler(res, error);
                    })
            });



    } catch (error) {
        errorHandler(res, error);
    }

};

