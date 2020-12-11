const express = require('express');
const passport = require('passport');
const controller = require('../controllers/heals-check');
const router = express.Router();

router.get('/',  controller.get);

module.exports = router;
