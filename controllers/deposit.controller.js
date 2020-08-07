const Deposit = require('../models/deposit.model');
const UserBalance = require('../models/userBalance.model');

exports.find = function (req, res) {
    Deposit.find(function (err, deposits) {
        if (err) return next(err);
        deposits = deposits.map((deposit) => {
            return deposit.toObject({ versionKey: false })
        })
        return res.send(deposits);
    })
};

exports.findOne = function (req, res) {
    Deposit.findById(req.params.id, function (err, deposit) {
        if (err) return next(err);
        if (!deposit) return res.status(404).send("deposit not found")
        return res.send(deposit.toObject({ versionKey: false }));
    })
};

exports.create = function (req, res) {
    let deposit = new Deposit(
        {
            amount: req.body.amount,
            user: req.body.userId,
            date: req.body.date
        }
    );

    deposit.save(deposit, function (err) {
        if (err) {
            console.log(err)
            return res.status(409).send(err)
        }
        UserBalance.find({ user: req.body.userId }, (err, userBalance) => {
            if (err) {
                console.log(err)
                return res.status(409).send(err)
            }
            userBalance.amount += deposit.amount
            userBalance.save(userBalance, (err) => {
                if (err) {
                    console.log(err)
                    return res.status(409).send(err)
                }
            })
            return res.send({ "result": 'Deposit created' })
        })
    })
};

exports.update = function (req, res) {
    Deposit.findById(req.params.id, function (err, deposit) {
        if (err) return next(err);
        if (!deposit) return res.status(404).send("deposit not found")
        console.log("a updatear:", deposit)
        deposit.amount += req.body.amount
        Deposit.findByIdAndUpdate(req.params.id, deposit, function (err) {
            if (err) {
                console.log(err)
                return res.status(409).send({ "error": err })
            }
            return res.send({ "result": 'deposit updated' })
        })
    })
};

exports.delete = function (req, res) {
    // aca deberia borrar del balance tamb
    Deposit.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err)
            return res.status(490).send({ "error": err })
        }
        return res.send({ "result": 'Deposit deleted' })
    })
}