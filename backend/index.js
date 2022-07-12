require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({msg: 'Rota inicial'});
})

const DeliveryRoutes = require('./routes/DeliveryRoutes')

app.use('/deliveries', DeliveryRoutes)

app.listen(5000)