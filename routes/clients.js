const express = require('express');
const controller = require('../controllers/clients');
const router = express.Router();

router.get('/', controller);

module.exports = router;