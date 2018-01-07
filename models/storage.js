var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var storageSchema = new Schema({
    drink: { type: Schema.Types.ObjectId, ref: 'Drinks', required: true },
    bottles: { type: Number, default: 0 },
    location: { type: Schema.Types.ObjectId, ref: 'Locations' },
    price: { type: Number, required: true }
});

var Storage = mongoose.model('Storage', storageSchema);

//Storage.index({ drink: 1, location: 1 }, { unique: true });

module.exports = Storage;