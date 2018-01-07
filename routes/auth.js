const passport = require('passport'),
      jwt = require('jsonwebtoken'),
      db = require('../models/schemas'),
      secret = require('../config').jwtSecret;

function ensureAuthenticated(req, res, next) {
    let token = req.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                res.status(401);
                res.json({ success: false, message: err.message });
            } else {
                req.user = decoded;
                return next();
            }
        });
    } else {
        res.status(403);
        res.send({
            success: false,
            message: 'No token provided.'
        });
    }
};

function setRolesForUser(req, res, next) {
    db.Users.findOne({ username: req.user.name }, function(err, user) {
        req.user.rights = user.rights;
    });
};


function DbAuth() {
    let generateToken = function(req) {
        req.token = jwt.sign({
            name: req.user.username
        }, secret, {
            expiresIn: '1h'
        });
    };

    let responddToken = function(req, res) {
        res.status(200);
        res.json({
            user: req.user.username,
            token: req.token
        });
    };

    this.login = function(req, res, next) {
        passport.authenticate('login-db', function(err, user, info) {
            if (err)
                return next(err);
            if (!user) {
                res.status(info.status);
                res.send(info.message);
                //res.status(401);
                //res.json({ success: false, message: info });
            } else {
                req.login(user, loginErr => {
                    if (loginErr) {
                        console.log(loginErr);
                        next(loginErr);
                    }
                    generateToken(req);
                    responddToken(req, res);
                    next();
                });
            }
        })(req, res, next);
    };

    this.signup = function(req, res, next) {
        passport.authenticate('signup-db', function(err, user, info) {
           if (err)
               return next(err);
           if (!user) {
               res.status(info.status);
               res.send(info.message);
           } else {
               res.status(200);
               res.send("Successfull registered user " + user);
           }
        })(req, res, next);
    }
}


module.exports.db = new DbAuth();
module.exports.ensureAuth = ensureAuthenticated;