const router = require('express').Router();

const DeliveryController = require('../controllers/DeliveryController')

router.post('/register', DeliveryController.register)

module.exports = router