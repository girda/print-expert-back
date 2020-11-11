const express = require('express');
const controller = require('../controllers/printers');
const router = express.Router();

router.get('/:id', controller.getAll);
router.patch('/', controller.update);

module.exports = router;
