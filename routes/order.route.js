const express = require('express');
const router = express.Router();

const order_controller = require('../controllers/order.controller');

router.get('/', order_controller.find);
router.get('/:id', order_controller.findOne);
router.put('/:id', order_controller.update);
router.post('/buy', order_controller.buy);
router.post('/sell', order_controller.sell);
router.delete('/:id', order_controller.delete);
router.post('/', order_controller.create);


module.exports = router;