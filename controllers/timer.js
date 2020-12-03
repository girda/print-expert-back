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
        // Перед запуском таймера обновляю статус и время в БД
        await Settings.update(
            {
                exec_status: keys.statusStartTimer,
                hh: req.body.hour,
                mm: req.body.minutes,
                period: req.body.period ? req.body.period : keys.timerPeriod
            },
            {where: {id: parseInt(req.params.id)}})
            .then(() => {
                // собираю параметры для запуска таймера
                Settings.findOne({where: {id: parseInt(req.params.id)}})
                    .then(setting => {
                        const paramsTimer = {
                            callback: connectionsCWW,
                            callbackWhere: keys.timerId === parseInt(req.params.id) ? null : {status: keys.statusConnectionError},
                            periodTime: setting.period * 1000 * 60 * 60, // 1000 - мл, 60 - сек, 60 - мин
                            startHour: setting.dataValues.hh,
                            startMinutes: setting.dataValues.mm,
                            timerTimeout: keys.timerId === parseInt(req.params.id) ? global.timerTimeout : global.timerErrorsTimeout,
                            timerInterval: keys.timerId === parseInt(req.params.id) ? global.timerInterval : global.timerIErrorsnterval
                        };

                        setTimer(paramsTimer);
                        res.json(setting)
                    })
                    .catch(error => {
                        console.log(error);
                        Settings.update(
                            {
                                error_status: 1,
                                error_descr: error
                            },
                            {where: {id: parseInt(req.params.id)}});
                        errorHandler(res, error);
                    })
            });



    } catch (error) {
        Settings.update(
            {
                error_status: 1,
                error_descr: error
            },
            {where: {id: parseInt(req.params.id)}});
        errorHandler(res, error);
    }

};

module.exports.stop = async (req, res) => {
    try {
        Settings.update(
            {exec_status: keys.statusStopTimer},
            {where: {id: parseInt(req.params.id)}})
            .then(() => {

                if (keys.timerId === parseInt(req.params.id)) {
                    if (global.timerInterval) {
                        clearInterval(global.timerInterval)
                    } else if (global.timerTimeout) {
                        clearTimeout(global.timerTimeout)
                    }
                } else {
                    if (global.timerErrorsInterval) {
                        clearInterval(global.timerErrorsInterval)
                    } else if (global.timerErrorsTimeout) {
                        clearTimeout(global.timerErrorsTimeout)
                    }
                }
                Settings.findOne({where: {id: parseInt(req.params.id)}})
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

