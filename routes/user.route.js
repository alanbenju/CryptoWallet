const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user.controller');

router.get('/', user_controller.find);
router.get('/:id', user_controller.findOne);
router.put('/:id', user_controller.update);
router.post('/', user_controller.create);
router.delete('/:id', user_controller.delete);


module.exports = router;