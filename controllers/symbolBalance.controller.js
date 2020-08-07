const SymbolBalance = require('../models/symbolBalance.model');

exports.find = function (req, res) {
    SymbolBalance.find(function (err, symbolBalances) {
        if (err) return next(err);
        symbolBalances = symbolBalances.map((symbolBalance)=>{
            return symbolBalance.toObject({ versionKey: false })
        })
        return res.send(symbolBalances);
    })
};

exports.findOne = function (req, res) {
    SymbolBalance.findById(req.params.id,function (err, symbolBalance) {
        if (err) return next(err);
        if (!symbolBalance) return res.status(404).send("SymbolBalance not found")
        return res.send(symbolBalance.toObject({ versionKey: false }));
    })
};

exports.update = function (req, res) {
    let symbolBalance = {}
    let atrs = ["nombre","apellido","email","password"]
    atrs.forEach(element => {
        if (req.body[element]) symbolBalance[element] = req.body[element]
    });
    SymbolBalance.findByIdAndUpdate(req.params.id,symbolBalance,function (err) {
        if (err) {
            console.log(err)
            return res.status(409).send({"error":err})
        }
        return res.send({"result":'SymbolBalance updated'})
    })
};

exports.delete = function(req,res){
    SymbolBalance.findByIdAndRemove(req.params.id,function (err) {
        if (err) {
            console.log(err)
            return res.status(490).send({"error":err})
        }
        return res.send({"result":'SymbolBalance deleted'})
    })
}