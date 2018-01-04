var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var usersSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    name: [new Schema({
        firstname: String,
        lastname: String
    })],
    balance: { type: Number, default: 0 },
    rights: [new Schema({
        globalrole: { type: Schema.Types.ObjectId, ref: 'Roles'},
        locations: [new Schema({
            location: { type: Schema.Types.ObjectId, ref: 'Locations' },
            role: { type: Schema.Types.ObjectId, ref: 'Roles' }
        })]
    })]
});

usersSchema.virtual('fullname').get(function() {
    return this.name.firstname + ", " + this.name.lastname;
});

var Users = mongoose.model('Users', usersSchema);

module.exports = Users;