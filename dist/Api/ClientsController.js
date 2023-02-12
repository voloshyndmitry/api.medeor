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
exports.ClientsController = void 0;
var Constants_1 = __importDefault(require("../Constants"));
var ClientConnector_1 = require("../DB/Clients/ClientConnector");
var AuthorizeService_1 = require("../Services/AuthorizeService");
var Validation_1 = require("../Helpers/Validation");
var ClientsController = /** @class */ (function () {
    function ClientsController(app) {
        var _this = this;
        this.constants = Constants_1.default;
        this.autService = new AuthorizeService_1.AuthorizeService;
        this.defaultError = { error: "Can`t find the client(s)." };
        this.validationError = { error: 'Validation Error: name ,surname ,sex ,age ,phone ,email are required values' };
        this.getClients = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, userId, clients;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.userId, userId = _a === void 0 ? '' : _a;
                        return [4 /*yield*/, ClientConnector_1.getClientsByDoctorId(userId)];
                    case 1:
                        clients = (_b.sent()) || [];
                        return [2 /*return*/, res.json({ clients: clients })];
                }
            });
        }); };
        this.getClient = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, _a, userId, client, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.query.id, _a = req.userId, userId = _a === void 0 ? '' : _a;
                        return [4 /*yield*/, ClientConnector_1.getClientById(String(id), userId)];
                    case 1:
                        client = _b.sent();
                        response = client || this.defaultError;
                        res.json(response);
                        return [2 /*return*/];
                }
            });
        }); };
        this.updateClient = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var body, _a, userId, client, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = req.body, _a = req.userId, userId = _a === void 0 ? '' : _a;
                        client = __assign(__assign({}, body), { doctorId: userId });
                        if (!client.id) return [3 /*break*/, 2];
                        return [4 /*yield*/, ClientConnector_1.updateClient(client, userId)];
                    case 1:
                        data = _b.sent();
                        return [2 /*return*/, res.json(data)];
                    case 2: return [2 /*return*/, res.json(this.defaultError)];
                }
            });
        }); };
        this.addClient = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var body, _a, userId, newClient, client, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = req.body, _a = req.userId, userId = _a === void 0 ? '' : _a;
                        newClient = __assign(__assign({}, body), { doctorId: userId, id: new Date().getTime().toString() });
                        client = Validation_1.clientValidation(newClient);
                        if (!!client.error) return [3 /*break*/, 2];
                        return [4 /*yield*/, ClientConnector_1.addClient(client)];
                    case 1:
                        data = _b.sent();
                        return [2 /*return*/, res.json(data)];
                    case 2: return [2 /*return*/, res.json(client || this.validationError)];
                }
            });
        }); };
        this.deleteClient = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, _a, userId, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.query.id, _a = req.userId, userId = _a === void 0 ? '' : _a;
                        return [4 /*yield*/, ClientConnector_1.deleteClientById(String(id), userId)];
                    case 1:
                        data = _b.sent();
                        if (data) {
                            return [2 /*return*/, res.json(data)];
                        }
                        return [2 /*return*/, res.json(this.defaultError)];
                }
            });
        }); };
        this.app = app;
        this.setRequestHandlers();
    }
    ClientsController.prototype.setRequestHandlers = function () {
        var _a = this.constants.apiUrls, client = _a.client, clients = _a.clients;
        this.app.get(clients, this.autService.authenticateToken, this.getClients);
        this.app.get(client, this.autService.authenticateToken, this.getClient);
        this.app.post(client, this.autService.authenticateToken, this.addClient);
        this.app.put(client, this.autService.authenticateToken, this.updateClient);
        this.app.delete(client, this.autService.authenticateToken, this.deleteClient);
    };
    return ClientsController;
}());
exports.ClientsController = ClientsController;
