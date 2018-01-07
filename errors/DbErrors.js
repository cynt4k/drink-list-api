const Errors = require('./Errors');

class NotFound extends Errors.ExtendableError{
    constructor(message, status) {
        super(message || 'not found', status || 404);
    }
}

class Duplicate extends Errors.ExtendableError{
    constructor(message, status) {
        super(message || 'duplicate found', status || 409);
    }
}

class BadRequest extends Errors.ExtendableError{
    constructor(message, status) {
        super(message || 'bad request', status || 400);
    }
}

class InternalServerError extends Errors.ExtendableError {
    constructor(message, status) {
        super(message || 'internal server error', status || 500);
    }
}

module.exports.NotFound = NotFound;
module.exports.Duplicate = Duplicate;
module.exports.BadRequest = BadRequest;
module.exports.InternalServerError = InternalServerError;