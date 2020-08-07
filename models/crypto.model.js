const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CryptoSchema = new Schema({
    id: Schema.Types.ObjectId,
    symbol: {type: String, required: true, unique: true}
});


module.exports = mongoose.model('Crypto', CryptoSchema);