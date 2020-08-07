const express = require('express');
const router = express.Router();

const deposit_controller = require('../controllers/deposit.controller');

router.get('/', deposit_controller.find);
router.get('/:id', deposit_controller.findOne);
router.put('/:id', deposit_controller.update);
router.post('/', deposit_controller.create);
router.delete('/:id', deposit_controller.delete);


module.exports = router;