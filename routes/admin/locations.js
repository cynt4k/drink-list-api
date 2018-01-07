const db = require('../../models/schemas'),
    checkRole = require('../../misc/checkrole'),
    Rx = require('rxjs/Rx'),
    Errors = require('restify-errors');

function Locations() {
    this.getLocations = function(req, res, next) {
        checkRole(req);
        db.Locations.find().lean().exec(function(err, locations) {
            res.status(200);
            res.send(locations);
        });
    };

    this.getLocationById = function(req, res, next) {
        db.Locations.findById(req.params.id).lean().exec(function(err, location) {
            if (err) {
                return next(err);
            }
            if (!location) {
                return next(new Errors.NotFoundError({ message: 'ID: ' + req.params.id + ' not found.' }));
            }
            res.status(200);
            res.send(location);
            return next();
        });
    };

    this.postLocation = function(req, res, next) {
        if (!req.params.name)
            return next(new Errors.BadRequestError({ message: 'No location name provided.' }));
        let newLocation = new db.Locations({
            name: req.params.name
        })
        db.Locations.findOne({ 'name': req.params.name }, function(err, location) {
            if (err)
                return next(err);
            if (location) {
                return next(new Errors.ConflictError({ message: 'Name: ' + req.params.name + ' exists.' }));
            } else {
                newLocation.save(err => {
                    if (err)
                        return next(err);
                    res.send(200, "OK");
                    return next();
                });
            }
        });
    };
}

module.exports = new Locations();