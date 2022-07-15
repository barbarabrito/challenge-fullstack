const Delivery = require('../models/Delivery')

module.exports = class DeliveryController {

    static async register(req, res){

        const nome = req.body.nome;
        const peso = req.body.peso;
        const endereco = req.body.endereco;

        const delivery = new Delivery({
            nome: nome,
            peso: peso,
            endereco: endereco
        })
        
        try{
            const newDelivery = await delivery.save();
            res.status(201).json({msg: 'Delivery criado'})
        }catch(error){
            res.status(400).json({msg: error})
        }
    }

    static async getAllDeliveries(req, res) {

        const deliveries = await Delivery.find().sort();

        res.status(200).json({
            deliveries: deliveries,
        })
    }

    static async removeDelivery(req, res){

        const id = req.params.id;

        try{
            await Delivery.findByIdAndRemove(id);
            res.status(200).json('Removido')
        }catch(error){
            res.status(400).json('error')
        }
    }
}
