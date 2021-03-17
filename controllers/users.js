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
                        id: user.id,
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

module.exports.create = async (req, res) => {
    try {
        console.log(req.body);
        const candidate = await User.findOne({where: {login: req.body.login}});
        if (candidate) {
            res.json({message: `Користувач з логіном "${req.body.login}" вже існує! Введіть інший логін.`})
        } else {
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
        }
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

module.exports.update = (req, res) => {
    try {
        console.log(req.body);
        const newUser = {
            login: req.body.login,
            password: req.body.password,
            email: req.body.email,
            roleId: req.body.role,
            clientId: req.body.client
        };

        User.update(newUser, {where: {id: req.params.id}})
            .then(user => {
                console.log(user);
                res.json({message: `Користувача "${req.body.login}" успішно змінено`})
            })
            .catch(error => {
                console.log(error)
            })
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports.remove = async (req, res) => {

    try {
        await User.destroy({where: {id: req.params.id}})
            .then(() => {
                res.json({message: `Користувач успішно видалено`});
            })
            .catch(error => {
                console.log(error)
            })
    } catch (error) {
        errorHandler(res, error);
    }
};
