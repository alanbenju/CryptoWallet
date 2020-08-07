const express = require('express');
const router = express.Router();

const userBalance_controller = require('../controllers/userBalance.controller');

router.get('/', userBalance_controller.find);
router.get('/:id', userBalance_controller.findOne);
router.put('/:id', userBalance_controller.update);


module.exports = router;