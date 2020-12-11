'use strict';
const db = require('./db.js');
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();

const authRoutes = require('./routes/auth');
const clientsRoutes = require('./routes/clients');
const locationsRoutes = require('./routes/locations');
const departmentsRoutes = require('./routes/departments');
const printersRoutes = require('./routes/printers');
const tableRoutes = require('./routes/table');
const connectionsRoutes = require('./routes/connections-cww');
const filtersRoutes = require('./routes/filters');
const usersRoutes = require('./routes/users');
const timerRoutes = require('./routes/timer');
const healsCheckRoutes = require('./routes/heals-check');
const diagnosticsRoutes = require('./routes/diagnostics');

const connectionsCWW = require('./connectionCWW');
const setTimer = require('./util/setTimer');
const Settings = require('./models/Settings');
const keys = require('./config/keys');

db.sequelize.authenticate()
    .then(() => {
        console.log(`---> ВСТАНОВЛЕНО З'ЄДНАННЯ З БАЗОЮ ДАНИХ`);

        Settings.findAll()
            .then(settings => {
                settings.forEach(setting => {
                    // Проверяю статус запуска таймера, нужно ли его запустить для опроса данных
                    // keys.timerId - id основного таймера
                    // setting.dataValues.exec_status - статус запуска (1 - нужно запускать, 0 - нет)
                    // global.timerTimeout - присваиваю в эту переменную таймаут (через сколько нужно запустить таймер), это нужно для остановки таймера
                    if (setting.dataValues.id === keys.timerId && setting.dataValues.exec_status && !global.timerTimeout) {
                        const paramsTimer = {
                            callback: connectionsCWW, // функция создания параметров для опроса CenterWereWeb
                            callbackWhere: null, // условие для получения статуса опроса, в данном случае берев все ip адреса
                            periodTime: setting.period * 1000 * 60 * 60, // 1000 - мл, 60 - сек, 60 - мин
                            startHour: setting.dataValues.hh,
                            startMinutes: setting.dataValues.mm,
                            timerTimeout: global.timerTimeout, // создаем глобальную переменную, чтоб потом остановить таймер при необходимости
                            timerInterval: global.timerInterval //global.timerInterval в нем переодичность опросов, нужет для остановки интервала при необходимости
                        };
                        setTimer(paramsTimer);
                        // keys.timerErrorsId - id таймера который опрашивает неопрошеные CenterWereWeb (с ошибками)
                    } else if (setting.dataValues.id === keys.timerErrorsId && setting.dataValues.exec_status && !global.timerErrorsTimeout) {
                        const paramsTimer = {
                            callback: connectionsCWW,
                            callbackWhere: {status: keys.statusConnectionError}, // условие для получения ip адресов с ошибками
                            periodTime: setting.period * 1000 * 60 * 60, // 1000 - мл, 60 - сек, 60 - мин
                            startHour: setting.dataValues.hh,
                            startMinutes: setting.dataValues.mm,
                            timerTimeout: global.timerErrorsTimeout,
                            timerInterval: global.timerIErrorsnterval
                        };
                        setTimer(paramsTimer);
                    }
                })
            })
            .catch(error => {
                console.log(error)
            })
    })
    .catch(err => {
        console.log(`---> ПОМИЛКА ЗЄДНАННЯ З БАЗОЮ ДАННИХ:`, err);
    });

app.use(passport.initialize());
require('./middleware/passport')(passport);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api/auth", authRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/locations", locationsRoutes);
app.use("/api/departments", departmentsRoutes);
app.use("/api/printers", printersRoutes);
app.use("/api/table", tableRoutes);
app.use("/api/connections", connectionsRoutes);
app.use("/api/filters", filtersRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/timer", timerRoutes);
app.use("/api/hc", healsCheckRoutes);
app.use("/api/diagnostics", diagnosticsRoutes);

module.exports = app;
