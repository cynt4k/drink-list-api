module.exports.ExtendableError = class ExtendableError extends Error {
    constructor(message, status) {
        if (new.target === ExtendableError)
            throw new TypeError('Abstract class "ExtendableError" cannot be instantiated directly.');
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.status = status || 400;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports.Http = require('./HttpErrors');
module.exports.Db = require('./DbErrors');