const express = require('express');
const controller = require('../controllers/printers');
const router = express.Router();

router.get('/:id', controller);

module.exports = router;
