module.exports = {
    jwt: 'dev-jwt',
    databaseOptions: {
        name: 'xerox',
        login: 'ron',
        password: '-ron*',
        host: '192.168.1.109',
        port: '3306'
    },
    databaseSynchronizationTimeout: 100000,
    statusConnectionSuccess: 1,
    statusConnectionError: 0,
    statusStartTimer: 1,
    statusStopTimer: 0,
    timerId: 1,
    timerErrorsId: 2,
    timerPeriod: 1 // 1h
};
