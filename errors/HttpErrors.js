const Errors = require('./Errors');

class BadRequest extends Errors.ExtendableError{
    constructor(message, status) {
        super(message || 'bad request', status || 400);
    }
}

class Unauthorized extends Errors.ExtendableError {
    constructor(message, status) {
        super(message || 'unauthorized', status || 401);
    }
}

class Forbidden extends Errors.ExtendableError {
    constructor(message, status) {
        super(message || 'forbidden', status || 403);
    }
}

class NotFound extends Errors.ExtendableError {
    constructor(message, status) {
        super(message || 'not found', status || 404);
    }
}

class Conflict extends Errors.ExtendableError {
    constructor(message, status) {
        super(message || 'conflict', status || 409);
    }
}

class UnprocessableEntity extends Errors.ExtendableError {
    constructor(message, status) {
        super(message || 'unprocessable entity', status || 422);
    }
}

class InternalServerError extends Errors.ExtendableError {
    constructor(message, status) {
        super(message || 'internal server error', status || 500);
    }
}

module.exports.BadRequest = BadRequest;
module.exports.Unauthorized = Unauthorized;
module.exports.Forbidden = Forbidden;
module.exports.NotFound = NotFound;
module.exports.Conflict = Conflict;
module.exports.UnprocessableEntity = UnprocessableEntity;
module.exports.InternalServerError = InternalServerError;