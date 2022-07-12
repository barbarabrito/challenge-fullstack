require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors =  require('cors');

app.use(express.json());

app.use(cors({ credentials: true, origin: '*' }));

app.get('/', (req, res) => {
    res.status(200).json({msg: 'Rota inicial'});
})

const DeliveryRoutes = require('./routes/DeliveryRoutes')

app.use('/deliveries', DeliveryRoutes)

app.listen(process.env.PORT || 5000)