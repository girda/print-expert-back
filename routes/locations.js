const express = require('express');
const controller = require('../controllers/locations');
const router = express.Router();

router.get('/:id', controller);

module.exports = router;
