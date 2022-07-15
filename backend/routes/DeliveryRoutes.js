const router = require('express').Router();

const DeliveryController = require('../controllers/DeliveryController');

router.post('/register', DeliveryController.register);

router.get('/', DeliveryController.getAllDeliveries);

router.delete('/:id', DeliveryController.removeDelivery);

module.exports = router;
