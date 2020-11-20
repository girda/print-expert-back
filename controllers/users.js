const User = require('../models/User');
const Role = require('../models/Role');
const Client = require('../models/Client');
const errorHandler = require('../util/errorHandler');

module.exports.getAll = async (req, res) => {
    try {
        User.belongsTo(Role);
        User.belongsTo(Client);

        await User.findAll({
            include: [{model: Role}, {model: Client}]

        })
            .then(users => {
                const resUser = [];
                users.forEach(user => {

                    resUser.push({
                        login: user.login,
                        email: user.email,
                        name: user.name_full,
                        role: user.role.name,
                        client: user.client ? user.client.name : user.client
                    })

                });
                res.json(resUser)
            })
            .catch(error => console.log(error))
    } catch (error) {
        errorHandler(res, error);
    }

};

module.exports.create = (req, res) => {
    try {
        console.log(req.body);
        const newUser = {
            login: req.body.login,
            password: req.body.password,
            email: req.body.email,
            roleId: req.body.role,
            clientId: req.body.client
        };

        User.create(newUser)
            .then(user => {
                console.log(user.dataValues);
                res.json({message: `Користувач "${user.dataValues.login}" успішно створений`})
            })
            .catch(error => {
                console.log(error)
            })
    } catch (error) {
        errorHandler(res, error);
    }
};
