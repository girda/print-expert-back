const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');

module.exports.login = (req, res) => {
    const reqUser = req.body;

    User.findOne({where: {login: reqUser.login}})
        .then(user => {

            if (reqUser.password === user.password) {

                const token = jwt.sign(user.dataValues, keys.jwt, {expiresIn: 60 * 60 * 12});

                res.status(200).json({
                    token: "Bearer " + token
                });
            } else {
                res.status(401).json({message: 'невірний пароль'});
            }
        }).catch(err => {
        console.log(err);
        res.status(404).json({message: 'користувач відсутній'});
    })
};
