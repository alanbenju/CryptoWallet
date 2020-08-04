const express = require('express');
const router = express.Router();

const coin_controller = require('../controllers/coin.controller');

router.get('/:coin/quote', coin_controller.getCuote);

module.exports = router;