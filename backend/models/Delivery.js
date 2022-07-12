const mongoose = require('../db/connection');

const {Schema} = mongoose;

const Delivery = mongoose.model(
    'Delivery',

    new Schema({
        nome:{
            type:String,
            required: true,
        },
        peso:{
            type:Number,
            required: true,
        },
        endereco:{

            logradouro:{
                type:String,
            },numero:{
                type:String,
            },
            bairro:{
                type:String,
            },complemento:{
                type:String,
            },
            cidade:{
                type:String,
            },
            estado:{
                type:String
            },
            pais:{
                type:String
            },
            geolocalizacao:{
                latitude:{
                    type:Number,
                },
                longitude:{
                    type:Number,
                },
            }
        },
    })
)

module.exports = Delivery

/*

    Nome do cliente
    Peso em kg
    Endereço
        Logradouro
        Número
        Bairro
        Complemento
        Cidade
        Estado
        País
        Geolocalização
            Latitude
            Longitude

*/