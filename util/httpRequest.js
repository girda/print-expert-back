const util = require('../config/keys');
const http = require('http');

module.exports = (params) => {
    const options = {
        host: params.ip,
        port: 8080,
        path: params.path,
        method: params.method ? params.method : 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    console.log(params.ip);
    const callback = (response) => {
        let printers;
        response.on('data', (chunk) => {
            printers = chunk;
        });
        response.on('end', () => {
            printers = JSON.parse(printers);
            params.creationMethod(printers)
        });
    };

    try {
        const req = http.request(options, callback)
            .on("error", (error) => {
                params.updateStatus(util.statusConnectionError, error.message);
                console.log("Error: " + error.message);
            });
        req.write(params.data);
        req.end();

    } catch (error) {
        console.log(error)
    }
};
