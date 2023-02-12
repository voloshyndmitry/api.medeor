"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizeService = void 0;
require('dotenv').config();
var jwt = require("jsonwebtoken");
var errorMessage = 'Not Authorized';
var AuthorizeService = /** @class */ (function () {
    function AuthorizeService() {
    }
    AuthorizeService.prototype.generateAccessToken = function (username) {
        // expires after half and hour (1800 seconds = 30 minutes)
        return jwt.sign(username, process.env.TOKEN_SECRET);
        // return jwt.sign(username, ACCESS_TOKEN_SECRET, { expiresIn: 60 * 60 * 5 });
    };
    AuthorizeService.prototype.authenticateToken = function (req, res, next) {
        // Gather the jwt access token from the request header
        var authHeader = req.headers['authorization'];
        var token = authHeader && authHeader.split(' ')[1];
        if (token == null) {
            return res.status(401).json({ message: errorMessage }); // if there isn't any token
        }
        jwt.verify(token, process.env.TOKEN_SECRET, function (err, userId) {
            if (err) {
                console.log('jwt error:', err);
                return res.sendStatus(403);
            }
            req.userId = userId;
            next(); // pass the execution off to whatever request the client intended
        });
    };
    AuthorizeService.prototype.setAutorization = function (req, name) {
        var session = req.session;
        session._email = name;
    };
    AuthorizeService.prototype.checkAuthorize = function (req, res) {
        var session = req.session;
        var isAuthorized = Boolean(session._email);
        if (isAuthorized) {
            return true;
        }
        res.status(401).send({ message: errorMessage });
        return false;
    };
    return AuthorizeService;
}());
exports.AuthorizeService = AuthorizeService;
