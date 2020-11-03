const express = require('express');
const controller = require('../controllers/departments');
const router = express.Router();

router.get('/:id', controller);

module.exports = router;
