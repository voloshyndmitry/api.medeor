interface StatusError extends Error {
    status: number;
    code: string;
    message: string;
}

class BadRequest implements StatusError {
    status = 400;
    code = 'BAD_REQUEST';
    name = 'Error';
    message: string;

    constructor(message: string) {
        this.message = message;
    }
}

class NotFound implements StatusError {
    status = 404;
    code = 'NOT_FOUND';
    name = 'Error';
    message: string;

    constructor(message: string) {
        this.message = message;
    }
}

class UnprocessableEntity implements StatusError {
    status = 422;
    code = 'UNPROCESSABLE_ENTITY';
    name = 'Error';
    message: string;

    constructor(message: string) {
        this.message = message;
    }
}

class Unauthorized implements StatusError {
    status = 401;
    code = 'UNAUTHORIZED';
    name = 'Error';
    message: string;

    constructor(message: string) {
        this.message = message;
    }
}

class Forbidden implements StatusError {
    status = 403;
    code = 'FORBIDDEN';
    name = 'Error';
    message: string;

    constructor(message: string) {
        this.message = message;
    }
}

export {
    StatusError,
    BadRequest,
    Unauthorized,
    NotFound,
    UnprocessableEntity,
    Forbidden,
};