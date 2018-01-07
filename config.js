var db = {
    hostname: "server30.schneider-on.net",
    database: "drink-list-dev",
    username: "drinkuser",
    password: "test1234"
};

var defaultSettings = {
    user: {
        username: "admin",
        password: "test1234",
        email: "test@example.org",
        name: {
            firstname: "Admin",
            lastname: "User"
        },
        balance: 0,
        rights: {
            globalrole: "GlobalAdmin"
        }
    },
    roles: [{
        name: "GlobalAdmin",
        rights: {
            order: true,
            orderhistory: true,
            manageusers: true,
            resetusers: true,
            locations: true,
            wallet: true,
            storage: true,
            drinks: true
        }
    }],
    locations: {
        name: "Default"
    }
};

const jwtsecret = '5525285d215c69633e566b2e4356272b4a756c5147342651264c5e235b';


module.exports = {
    db: db,
    jwtSecret: jwtsecret,
    defaultSettings: defaultSettings
};