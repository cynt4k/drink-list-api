const db = require('../models/schemas'),
    Errors = require('restify-errors'),
    Rx = require('rxjs/Rx');

module.exports = function(req, location, right, callback) {

    let findUser = Rx.Observable.fromPromise(db.Users.findOne({ username: req.user.name }).exec());


    findUser
        .flatMap(user => {
            Rx.Observable.fromPromise(db.Users.)
        })


    findUser
        .catch(err => {
            console.log('jo');
        })
        .mergeMap(
            (user) => {

            }
        )
        .subscribe(
            (user) => {
                if (!user) {
                    return callback(new Errors.NotFoundError({ message: 'User: ' + req.user.name + ' not found.' }));
                }


            },
            (err) => {
                console.log(err);
            }
        );




    /*let locations = [];

    req.user.rights.locations.forEach(location => {
        locations.push(Rx.Observable.fromPromise(db.Locations.findById(location)));
    });

    locations.subscribe(
        function(location) {
            console.log(location);
        }
    );*/
};