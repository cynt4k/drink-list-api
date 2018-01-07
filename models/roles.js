var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var rolesSchema = new Schema({
    name: { type: String, unique: true, required: true },
    rights: {
        order: { type: Boolean, default: false },
        orderhistory: { type: Boolean, default: false },
        manageusers: { type: Boolean, default: false },
        resetusers: { type: Boolean, default: false },
        locations: { type: Boolean, default: false },
        wallet: { type: Boolean, default: false },
        storage: { type: Boolean, default: false },
        drinks: { type: Boolean, default: false }
    }
});

var Roles = mongoose.model('Roles', rolesSchema);

module.exports = Roles;