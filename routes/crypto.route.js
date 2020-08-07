const express = require('express');
const router = express.Router();

const crypto_controller = require('../controllers/crypto.controller');

router.get('/', crypto_controller.getAll);
router.get('/symbol/:symbol', crypto_controller.getSymbol);
router.post('/', crypto_controller.create);


module.exports = router;