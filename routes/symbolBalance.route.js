const express = require('express');
const router = express.Router();

const symbolBalance_controller = require('../controllers/symbolBalance.controller');

router.get('/', symbolBalance_controller.find);
router.get('/:id', symbolBalance_controller.findOne);
router.put('/:id', symbolBalance_controller.update);
router.delete('/:id', symbolBalance_controller.delete);


module.exports = router;