const express = require('express');
const passport = require('passport');
const controller = require('../controllers/printers');
const router = express.Router();

router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getAll);
router.patch('/', passport.authenticate('jwt', {session: false}), controller.update);

module.exports = router;
