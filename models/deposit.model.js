const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

let DepositSchema = new Schema({
    id: Schema.Types.ObjectId,
    amount: {type: Number, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    date: {type: Date, default: new Date()},
});


module.exports = mongoose.model('Deposit', DepositSchema);