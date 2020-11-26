const express = require('express');
const passport = require('passport');
const controller = require('../controllers/timer');
const router = express.Router();

router.get('/',  controller.get);
router.post('/start/:id',  controller.start);
router.get('/stop/:id',  controller.stop);

module.exports = router;
