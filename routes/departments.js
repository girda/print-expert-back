const express = require('express');
const controller = require('../controllers/departments');
const router = express.Router();

router.get('/:id', controller.getAll);
router.post('/', controller.create);

module.exports = router;
