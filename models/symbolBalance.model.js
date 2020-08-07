const mongoose = require('mongoose');
var SchemaTypes = mongoose.Schema.Types;
const Schema = mongoose.Schema;

let SymbolBalanceSchema = new Schema({
    id: Schema.Types.ObjectId,
    symbol: {type: String, required: true},
    avgPriceBought: {type: SchemaTypes.Decimal128, default: 0},
    quantity: {type: SchemaTypes.Decimal128, default: 0},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});


module.exports = mongoose.model('SymbolBalance', SymbolBalanceSchema);
