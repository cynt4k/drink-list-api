var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    jwt = require('restify-jwt'),
    db = require('../models/schemas'),
    bCrypt = require('bcrypt'),
    Rx = require('rxjs/Rx'),
    Errors = require('../errors/Errors');


var isValidPassword = function(user, password) {
    return bCrypt.compareSync(password, user.password);
};

var createHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use('login-db', new LocalStrategy({
        passReqToCallback: true
    },
    function (req, username, password, done) {
        findUser = function() {
            db.Users.findOne({username: username}, function (err, user) {
                if (err)
                    return done(err);
                if (!user) {
                    return done(null, false, new Errors.Http.Unauthorized('Incorrect username.'));
                }
                if (!isValidPassword(user, password)) {
                    return done(null, false, new Errors.Http.Unauthorized('Incorrect password.'));
                }
                return done(null, user);
            });
        };
        process.nextTick(findUser);
    }
));

passport.use('signup-db', new LocalStrategy({
        passReqToCallback: true
    },
    function (req, username, passsword, done) {
        findOrCreateUser = function() {
            db.Users.findOne({ 'username': username }, function(err, user) {
                if (err) {
                    console.log('Error in SignUp:' + err);
                    return done(err);
                }
                if (user) {
                    return done(null, false, new Errors.Db.Duplicate('User: ' + username + ' already exists'));
                } else {
                    db.Users.findOne({ 'email': req.params.email }, function(err, user) {
                        if (err) {
                            console.log('Error in SignUp:' + err);
                            return done(err);
                        }
                        if (user) {
                            return done(null, false, new Errors.Db.Duplicate('Email: ' + req.params.email + ' already exists'));
                        } else {
                            var newUser = new db.Users({
                                username: username,
                                password: createHash(req.params.password),
                                email: req.params.email,
                                name: {
                                    firstname: req.params.firstname,
                                    lastname: req.params.lastname
                                }
                            });
                            newUser.save(function(err) {
                                if (err) {
                                    console.log('Error in saving user: ' + err);
                                    throw err;
                                }
                                return done(null, newUser);
                            });
                        }
                    });
                }
            });
        };
        process.nextTick(findOrCreateUser);
    }));