const express = require('express');
const passport = require('passport');
const controller = require('../controllers/table');
const router = express.Router();

router.post('/', passport.authenticate('jwt', {session: false}), controller);


module.exports = router;
