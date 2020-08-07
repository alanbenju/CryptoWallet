const UserBalance = require('../models/userBalance.model');

exports.find = function (req, res) {
    UserBalance.find(function (err, userBalances) {
        if (err) return next(err);
        userBalances = userBalances.map((user)=>{
            return user.toObject({ versionKey: false })
        })
        return res.send(userBalances);
    })
};

exports.findOne = function (req, res) {
    UserBalance.findById(req.params.id,function (err, userBalance) {
        if (err) return next(err);
        if (!userBalance) return res.status(404).send("UserBalance not found")
        return res.send(userBalance.toObject({ versionKey: false }));
    })
};

exports.update = function (req, res) {
    let userBalance = {}
    let atrs = ["total"]
    atrs.forEach(element => {
        if (req.body[element]) userBalance[element] = req.body[element]
    });
    UserBalance.findByIdAndUpdate(req.params.id,userBalance,function (err) {
        if (err) {
            console.log(err)
            return res.status(409).send({"error":err})
        }
        return res.send({"result":'userBalance updated'})
    })
};
