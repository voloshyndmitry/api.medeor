"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
var Constants_1 = __importDefault(require("../Constants"));
var mongoConnect_1 = __importDefault(require("../DB/mongoConnect"));
var AuthorizeService_1 = require("../Services/AuthorizeService");
var UsersConnector_1 = require("../DB/Users/UsersConnector");
var Validation_1 = require("../Helpers/Validation");
var Meiler_1 = require("../Helpers/Meiler");
var UserController = /** @class */ (function () {
    function UserController(app) {
        var _this = this;
        this.constants = Constants_1.default;
        this.autService = new AuthorizeService_1.AuthorizeService;
        this.dbConnector = mongoConnect_1.default;
        this.defaultError = { error: "Can`t find the user." };
        this.getUserId = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, login, _c, pass, userId, token;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = req.query, _b = _a.login, login = _b === void 0 ? '' : _b, _c = _a.pass, pass = _c === void 0 ? '' : _c;
                        return [4 /*yield*/, this.dbConnector.getUserId(String(login), String(pass))];
                    case 1:
                        userId = _d.sent();
                        if (userId) {
                            token = this.autService.generateAccessToken(userId);
                            return [2 /*return*/, res.json({ userId: userId, token: token })];
                        }
                        res.json(this.defaultError);
                        return [2 /*return*/];
                }
            });
        }); };
        this.getUserData = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.query.id;
                        return [4 /*yield*/, UsersConnector_1.getUserDataById(String(id))];
                    case 1:
                        user = _a.sent();
                        if (!(user === null || user === void 0 ? void 0 : user.error)) {
                            return [2 /*return*/, res.json(user || this.defaultError)];
                        }
                        res.json(this.defaultError);
                        return [2 /*return*/];
                }
            });
        }); };
        this.getUsersData = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var users, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, UsersConnector_1.getAllUsersPublicData()];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, res.json(users !== null && users !== void 0 ? users : this.defaultError)];
                    case 2:
                        error_1 = _a.sent();
                        console.log("getUsersData error:", error_1);
                        return [2 /*return*/, res.json(this.defaultError)];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteUser = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.query.id;
                        return [4 /*yield*/, UsersConnector_1.deleteUserById(String(id))];
                    case 1:
                        users = _a.sent();
                        if (users) {
                            return [2 /*return*/, res.json({ users: users })];
                        }
                        res.json(this.defaultError);
                        return [2 /*return*/];
                }
            });
        }); };
        this.generateUserId = function () { return new Date().getTime().toString(); };
        this.addUser = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var body, user, result, mailInfo, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = req.body;
                        return [4 /*yield*/, Validation_1.userValidation(body)];
                    case 1:
                        user = _a.sent();
                        if (!!(user === null || user === void 0 ? void 0 : user.error)) return [3 /*break*/, 6];
                        user.id = this.generateUserId();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, UsersConnector_1.addUser(user)];
                    case 3:
                        result = _a.sent();
                        return [4 /*yield*/, Meiler_1.sendMail(Meiler_1.regMail(user.email))];
                    case 4:
                        mailInfo = _a.sent();
                        return [2 /*return*/, res.json(__assign(__assign({}, result), { mailInfo: mailInfo }))];
                    case 5:
                        err_1 = _a.sent();
                        return [2 /*return*/, res.json({ status: 'error', message: err_1 })];
                    case 6:
                        res.json(user);
                        return [2 /*return*/];
                }
            });
        }); };
        this.updateUser = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var body, user, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = req.body;
                        user = Validation_1.editUserValidation(body);
                        if (!!user.error) return [3 /*break*/, 2];
                        return [4 /*yield*/, UsersConnector_1.updateUser(user)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.json(result)];
                    case 2:
                        res.json(user);
                        return [2 /*return*/];
                }
            });
        }); };
        this.app = app;
        this.setRequestHandlers();
    }
    UserController.prototype.setRequestHandlers = function () {
        var _a = this.constants.apiUrls, login = _a.login, user = _a.user, users = _a.users;
        this.app.get(login, this.getUserId);
        this.app.get(user, this.autService.authenticateToken, this.getUserData);
        this.app.get(users, this.autService.authenticateToken, this.getUsersData);
        this.app.post(user, this.addUser);
        this.app.put(user, this.autService.authenticateToken, this.updateUser);
        this.app.patch(user, this.autService.authenticateToken, this.updateUser);
        this.app.delete(user, this.autService.authenticateToken, this.deleteUser);
    };
    return UserController;
}());
exports.UserController = UserController;
