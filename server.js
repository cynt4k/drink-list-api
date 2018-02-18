var restify = require('restify'),
    corsMiddleware = require('restify-cors-middleware'),
    config = require('./config'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    pass = require('./misc/pass'),
    controller = require('./routes/controller'),
    setup = require('./setup');

// Setup Connections
mongoose.connect('mongodb://' + config.db.username + ":" + config.db.password + "@" + config.db.hostname + "/" + config.db.database);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    console.log("Connection successfull");
});

const server = restify.createServer({
    name: "Drink List API",
    version: "1.0.0"
});

server.use(restify.plugins.queryParser());
//server.use(restify.plugins.jsonBodyParser({ mapParams: true }));
server.use(restify.plugins.bodyParser({ mapParams: true }));

const cors = corsMiddleware({
    origins: ['*']
});

server.pre(cors.preflight);
server.use(cors.actual);

server.use(passport.initialize());
//server.use(passport.session());

server.use(function(req, res, next) {
    console.log(req.method + ' ' + req.url);
    return next();
});

server.get('/', function(req, res, next) {
    res.send(200, "jo");
    return next();
});
server.post('/', function(req, res, next) {
    res.send(200, 'jo');
    return next();
});

server.post('/auth/login', controller.auth.db.login);
server.post('/auth/signup', controller.auth.db.signup);

server.get('/profil', controller.auth.ensureAuth);

// Admin Locations

server.get('/admin/locations', controller.auth.ensureAuth, controller.admin.locations.getLocations);
server.get('/admin/locations/:id', controller.admin.locations.getLocationById);
server.post('/admin/locations', controller.admin.locations.postLocation);
server.put('/admin/locations/:id', controller.admin.locations.putLocationById);
server.del('/admin/locations', controller.admin.delLocation);
server.del('/admin/locations/:id', controller.admin.locations.delLocationById);

// Admin Drinks
server.get('/admin/drinks', controller.admin.drinks.getDrinks);
server.get('/admin/drinks/:id', controller.admin.drinks.getDrinkById);
server.post('/admin/drinks', controller.admin.drinks.postDrink);
server.put('/admin/drinks/:id', controller.admin.drinks.putDrinkById);
server.del('/admin/drinks', controller.admin.drinks.delDrinks);
server.del('/admin/drinks/:id', controller.admin.drinks.delDrinkById);

// Admin Users
server.get('/admin/users', controller.admin.users.getUsers);
server.get('/admin/users/:id', controller.admin.users.getUserById);
server.post('/admin/users', controller.admin.users.postUser);
server.put('/admin/users/:id', controller.admin.users.putUser);
server.del('/admin/users', controller.admin.users.delUsers);
server.del('/admin/users/:id', controller.admin.users.delUserById);

// Admin Roles
server.get('/admin/roles', controller.admin.roles.getRoles);
server.get('/admin/roles/:id', controller.admin.roles.getRoleById);
server.post('/admin/roles', controller.admin.roles.postRole);
server.put('/admin/roles/:id', controller.admin.roles.putRole);
server.del('/admin/roles', controller.admin.roles.delRoles);
server.del('/admin/roles/:id', controller.admin.roles.delRoleById);

// Admin OrderHistory
server.get('/admin/orderhistories', controller.admin.orderhistory.getOrderHistories);
server.get('/admin/orderhistories/:id', controller.admin.orderhistory.getOrderHistoryById);
server.post('/admin/orderhistories', controller.admin.orderhistory.postOrderHistory);
server.put('/admin/orderhistories/:id', controller.admin.orderhistory.putOrderHistory);
server.del('/admin/orderhistories', controller.admin.orderhistory.delOrderHistories);
server.del('/admin/orderhistories/:id', controller.admin.orderhistory.delOrderHistoryById);

// Admin Storage
server.get('/admin/storage', controller.admin.storage.getStorage);
server.get('/admin/storage/:drink', controller.admin.storage.getStorageByDrink);
server.post('/admin/storage', controller.admin.storage.postStorage);
server.put('/admin/storage/:drink', controller.admin.storage.putStorageByDrink);

// User Drinks
server.get('/drinks', controller.user.drinks.getDrinks);
server.get('/drinks/:location/:id', controller.user.drinks.getDrinkById);
server.post('/order', controller.user.drinks.postOrder);
server.del('/order/:id', controller.user.drinks.delOrderById);

// User Profil
server.get('/profile', controller.user.profile.getProfile);
server.put('/profile', controller.user.profile.putProfile);
server.get('/profile/orderhistory', controller.user.profile.getOrderHistory);
server.del('/profile/orderhistory', controller.user.profile.delOrderHistory);
server.del('/profile/orderhistory/:id', controller.user.profile.delOrderHistoryById);


server.listen(8080, function() {
    console.log("%s listening at %s", server.name, server.url);
});

switch(process.argv.slice(2)[0]) {
    case 'setup':
        setup(); break;
    default: break;
}