const express = require('express');
const controller = require('../controllers/table');
const router = express.Router();

router.post('/', controller);


module.exports = router;
