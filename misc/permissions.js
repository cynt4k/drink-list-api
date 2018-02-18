const db = require('../models/schemas'),
    Rx = require('rxjs/Rx');


class Permissions {
    constructor() {
    }

    user(name) {
        let findUser = Rx.Observable.fromPromise(db.Users.findOne({username: name}));
        this.user = findUser;
    }

    location(location) {
        this.location = location;
        /*let rights = this.user.subscribe(
            (user) => {
                this.rights = user.rights;
            },
            (err) => {
                this.rights = null;
            }
        );*/
    }

    can(right) {
        if (this.location) {
            this.user.subscribe(
                (user) => {
                    console.log(user);
                }
            )
        }
    }
}