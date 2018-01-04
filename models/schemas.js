var drinks = require('./drinks'),
    locations = require('./locations'),
    orderhistory = require('./orderhistory'),
    roles = require('./roles'),
    storage = require('./storage'),
    users = require('./users');

module.exports = {
    Drinks: drinks,
    Locations: locations,
    OrderHistory: orderhistory,
    Roles: roles,
    Storage: storage,
    Users: users
};