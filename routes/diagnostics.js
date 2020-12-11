const express = require('express');
const passport = require('passport');
const controller = require('../controllers/diagnostics');
const router = express.Router();

router.get('/', controller.get);

module.exports = router;
