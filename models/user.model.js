const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    id: Schema.Types.ObjectId,
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    email: {type: String, required: true, unique : true, dropDups: true, index: true },
    password: {type: String, required: true},
    balance: {type: Number, required: true, default: 0.00}
});


module.exports = mongoose.model('User', UserSchema);