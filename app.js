'use strict';
const db = require('./db.js');
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();

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

const connectionsCWW = require('./connectionCWW');
const setTimer = require('./util/setTimer');

db.sequelize.authenticate()
    .then(() => {
        console.log(`---> ВСТАНОВЛЕНО З'ЄДНАННЯ З БАЗОЮ ДАНИХ`);
        const periodTime = 1000 * 60; // 1 минут
        // setTimer(connectionsCWW, periodTime, 13, 23);
        // console.log(global.timerInterval)
        // console.log(global.timerTimeout)
        // setTimeout(()=> {
        //     console.log(global.timer)
        // }, 1000* 50)
        // connectionsCWW()

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

module.exports = app;
