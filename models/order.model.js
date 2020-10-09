const mongoose = require('mongoose');
var SchemaTypes = mongoose.Schema.Types;
const Schema = mongoose.Schema;

let OrderSchema = new Schema({
    id: Schema.Types.ObjectId,
    symbol: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    type: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: new Date() }
});


module.exports = mongoose.model('Order', OrderSchema);