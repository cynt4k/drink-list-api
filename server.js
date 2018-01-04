var restify = require('restify'),
    corsMiddleware = require('restify-cors-middleware'),
    config = require('./config'),
    mongoose = require('mongoose');

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
server.use(restify.plugins.jsonBodyParser({ mapParams: true }));

const cors = corsMiddleware({
    origins: ['*']
});

server.pre(cors.preflight);
server.use(cors.actual);


server.use(function(req, res, next) {
    console.log(req.method + ' ' + req.url);
    return next();
})

server.get('/', function(req, res, next) {
    res.send(200, "jo");
    return next();
});

server.listen(8080, function() {
    console.log("%s listening at %s", server.name, server.url);
});