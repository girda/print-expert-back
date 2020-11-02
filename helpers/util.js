module.exports = {
    setIntervalAndExecute: (func, time) => {
        func();
        return (setInterval(func, time))
    },
    transformDataDB1cInDB(data, list) {
        const intermediateResult = {};
        const results = {
            products: [],
            clients: []
        };
        list.forEach(name => {
            intermediateResult[name] = [];
        });

        data.forEach((obj, i) => {
            for (let key in obj) {
                intermediateResult[list[i]].push(obj[key].dataValues)
            }
        });

        intermediateResult.products.forEach((product, i) => {
            results.products.push({...intermediateResult.invoices[i], ...product});
            delete results.products[i].invoice_id;
            delete results.products[i].id;
        });
        results.clients = intermediateResult.clients;

        return results;
    }
};
