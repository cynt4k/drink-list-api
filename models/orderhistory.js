var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var orderHistorySchema = new Schema({
    drink: { type: Schema.Types.ObjectId, ref: 'Drinks' },
    price: { type: Number, required: true },
    payed: { type: Boolean, default: false },
    orderdate: { type: Date, default: now() },
    payeddate: { type: Date, default: none },


});

var OrderHistory = mongoose.model('OrderHistory', orderHistorySchema);

module.exports = OrderHistory;