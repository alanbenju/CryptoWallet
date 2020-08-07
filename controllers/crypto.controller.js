const request = require('request')
const Crypto = require('../models/crypto.model');

exports.getAll = function (req, res) {
    Crypto.find(function (err, cryptos) {
        if (err) return next(err);
        cryptos = cryptos.map((cryptos)=>{
            return cryptos.toObject({ versionKey: false })
        })
        return res.send(cryptos);
    })
};

exports.getSymbol = function (req, res) {
    var symbol = req.params.symbol
    var url = "https://api.binance.com/api/v1/ticker/price?symbol="+symbol
    return new Promise((resolve,reject)=>{
        return request.get({url:url,'content-type': 'application/json',}, function (error, response, body) {
            if (error) reject(error) 
            res.json(JSON.parse(body))
        });
    })
};

exports.create = function (req, res) {
    let crypto = new Crypto(
        {
            symbol: req.body.symbol
        }
    );
    crypto.save(crypto,function (err) {
        if (err) {
            console.log(err)
            return res.status(409).send(err)
        }
        return res.send({"result":'Crypto added'})
    })
};