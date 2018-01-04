var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var drinksSchema = new Schema({
    name: { type: String, unique: true, required: true },
    ean: { type: Number, unique: true, required: false },
    price: { type: Number, default: 0 }
});

var Drinks = mongoose.model('Drinks', drinksSchema);

module.exports = Drinks;