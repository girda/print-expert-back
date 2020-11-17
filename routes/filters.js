const express = require('express');
const passport = require('passport');
const controller = require('../controllers/filters');
const router = express.Router();

router.get('/:id', passport.authenticate('jwt', {session: false}), controller.get);
router.patch('/:id', controller.update);

module.exports = router;
