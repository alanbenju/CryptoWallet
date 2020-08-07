const Order = require('../models/order.model');
const UserBalance = require('../models/userBalance.model');
const SymbolBalance = require('../models/symbolBalance.model');

exports.find = function (req, res) {
    Order.find(function (err, orders) {
        if (err) return next(err);
        orders = orders.map((order) => {
            return order.toObject({ versionKey: false })
        })
        return res.send(orders);
    })
};

exports.findOne = function (req, res) {
    Order.findById(req.params.id, function (err, order) {
        if (err) return next(err);
        if (!order) return res.status(404).send("order not found")
        return res.send(order.toObject({ versionKey: false }));
    })
};

exports.buy = function (req, res) {
    let order = new Order(
        {
            symbol: req.body.symbol,
            price: req.body.price,
            quantity: req.body.quantity,
            type: "BUY",
            user: req.body.userId,
            date: req.body.date
        }
    );
    var p1 = UserBalance.find({user:req.body.userId})
    var p2 = SymbolBalance.find({user:req.body.userId, symbol: req.body.symbol})
    Promise.all([p1,p2]).then((results)=>{
        var userBalance = results[0]
        var symbolBalance = results[1]
        if (!symbolBalance){
            var newSymbol = new SymbolBalance({
                symbol: order.symbol,
                avgPriceBought: order.price,
                quantity: order.quantity
            })
            userBalance.total -= (order.price * order.quantity)
            var p3 = order.save()
            var p4 = userBalance.save()
            var p5 = newSymbol.save()
            Promise.all([p3,p4,p5]).then(()=>{
                return res.send({ "result": 'Bought!' })
            })
        }
        else{
            userBalance.total -= (order.price * order.quantity)
            var savedQT = order.quantity + symbolBalance.quantity
            symbolBalance.avgPriceBought = (symbolBalance.avgPriceBought * symbolBalance.quantity + order.quantity * order.price) / savedQT
            symbolBalance += order.quantity
            var p3 = order.save()
            var p4 = userBalance.save()
            var p5 = symbolBalance.save()
            Promise.all([p3,p4,p5]).then(()=>{
                return res.send({ "result": 'Bought!' })
            })
    
        }
    }).catch((err)=>{
        console.log("error",err)
        return res.status(409).send(err)
    })
};

exports.sell = function (req, res) {
    let order = new Order(
        {
            symbol: req.body.symbol,
            price: req.body.price,
            quantity: req.body.quantity,
            type: "SELL",
            user: req.body.userId,
            date: req.body.date
        }
    );
    var p1 = UserBalance.find({user:req.body.userId})
    var p2 = SymbolBalance.find({user:req.body.userId, symbol: req.body.symbol})
    Promise.all([p1,p2]).then((results)=>{
        var userBalance = results[0]
        var symbolBalance = results[1]
        userBalance.total += (order.price * order.quantity)
        var savedQT = symbolBalance.quantity - order.quantity 
        symbolBalance.avgPriceBought = (symbolBalance.avgPriceBought * symbolBalance.quantity - order.quantity * order.price) / savedQT
        symbolBalance -= order.quantity
        var p3 = order.save()
        var p4 = userBalance.save()
        var p5 = symbolBalance.save()
        Promise.all([p3,p4,p5]).then(()=>{
            return res.send({ "result": 'Sold!' })
        })
    }).catch((err)=>{
        console.log("error",err)
        return res.status(409).send(err)
    })
};

exports.update = function (req, res) {
    let order = {}
    let atrs = ["symbol", "price", "quantity", "type","date"]
    atrs.forEach(element => {
        if (req.body[element]) order[element] = req.body[element]
    });
    Order.findByIdAndUpdate(req.params.id, order, function (err) {
        if (err) {
            console.log(err)
            return res.status(409).send({ "error": err })
        }
        return res.send({ "result": 'Order updated' })
    })
};

exports.delete = function (req, res) {
    Order.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err)
            return res.status(490).send({ "error": err })
        }
        return res.send({ "result": 'Order deleted' })
    })
}