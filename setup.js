var vars = require('./config').defaultSettings,
    db = require('./config').db,
    schemas = require('./models/schemas'),
    bCrypt = require('bcrypt');


module.exports = function() {
    var defaultRole = schemas.Roles(vars.roles[0]);

    defaultRole.save(function(err) {
        if (err) throw err;
        console.log('Role created');
    });

    vars.user.rights.globalrole = defaultRole._id;
    vars.user.password = bCrypt.hashSync(vars.user.password, bCrypt.genSaltSync(10), null);
    var adminUser = schemas.Users(vars.user);


    adminUser.save(function(err) {
        if (err) throw err;
        console.log('User created');
    });
};