"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Forbidden = exports.UnprocessableEntity = exports.NotFound = exports.Unauthorized = exports.BadRequest = void 0;
var BadRequest = /** @class */ (function () {
    function BadRequest(message) {
        this.status = 400;
        this.code = 'BAD_REQUEST';
        this.name = 'Error';
        this.message = message;
    }
    return BadRequest;
}());
exports.BadRequest = BadRequest;
var NotFound = /** @class */ (function () {
    function NotFound(message) {
        this.status = 404;
        this.code = 'NOT_FOUND';
        this.name = 'Error';
        this.message = message;
    }
    return NotFound;
}());
exports.NotFound = NotFound;
var UnprocessableEntity = /** @class */ (function () {
    function UnprocessableEntity(message) {
        this.status = 422;
        this.code = 'UNPROCESSABLE_ENTITY';
        this.name = 'Error';
        this.message = message;
    }
    return UnprocessableEntity;
}());
exports.UnprocessableEntity = UnprocessableEntity;
var Unauthorized = /** @class */ (function () {
    function Unauthorized(message) {
        this.status = 401;
        this.code = 'UNAUTHORIZED';
        this.name = 'Error';
        this.message = message;
    }
    return Unauthorized;
}());
exports.Unauthorized = Unauthorized;
var Forbidden = /** @class */ (function () {
    function Forbidden(message) {
        this.status = 403;
        this.code = 'FORBIDDEN';
        this.name = 'Error';
        this.message = message;
    }
    return Forbidden;
}());
exports.Forbidden = Forbidden;
