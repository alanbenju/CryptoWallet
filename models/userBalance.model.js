const mongoose = require('mongoose');
var SchemaTypes = mongoose.Schema.Types;
const Schema = mongoose.Schema;

let UserBalanceSchema = new Schema({
    id: Schema.Types.ObjectId,
    total: {type: SchemaTypes.Decimal128, default: 0},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});


module.exports = mongoose.model('UserBalance', UserBalanceSchema);