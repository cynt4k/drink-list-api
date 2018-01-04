var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var locationsSchema = new Schema({
    name: { type: Number, unique: true, required: true }
});

var Locations = mongoose.model('Locations', locationsSchema);

module.exports = Locations;