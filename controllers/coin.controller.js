const request = require('request')
const Coin = require('../models/coin.model');
//import { Coin , Dolar, Peso, Real } from "../models/coin.model";


exports.getCuote = function (req, res) {
    console.log(Coin)
    let coin = new Coin()
    coin.setStrategy(req.params.coin)
    return coin.getData()
    .then((response)=>{
        res.status(200).send(response)
    })
    .catch((err)=>{
        res.status(501).send(err)
    })
};