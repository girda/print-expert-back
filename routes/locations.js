const express = require('express');
const controller = require('../controllers/locations');
const router = express.Router();

router.get('/:id', controller.getAll);
router.post('/', controller.create);
router.delete('/:id', controller.remove);

module.exports = router;
