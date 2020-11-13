const util = require('../config/keys');
const http = require('http');

module.exports = (ip, path, callbackSuccess, callbackError, method, body) => {
    const options = {
        host: ip,
        port: 8080,
        path: path,
        method: method ? method : 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const callback = (response) => {
        let printers;
        response.on('data', (chunk) => {
            printers = chunk;
        });
        response.on('end', () => {
            printers = JSON.parse(printers);
            callbackSuccess(printers)
        });
    };

    try {
        const req = http.request(options, callback)
            .on("error", (error) => {
                callbackError(util.statusError, error.message);
                console.log("Error: " + error.message);
            });
        req.write(body);
        req.end();

    } catch (error) {
        console.log(error)
    }
}