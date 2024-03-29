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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClientById = exports.addClient = exports.updateClient = exports.getClientsByDoctorId = exports.getClientById = void 0;
var mongoConnect_1 = __importDefault(require("../mongoConnect"));
var client = mongoConnect_1.default.client;
var dbName = 'medeordb';
var collection = 'clients';
var getAllClients = function () { return __awaiter(void 0, void 0, void 0, function () {
    var clients;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.db(dbName).collection(collection)
                    .findOne()];
            case 1:
                clients = (_a.sent()).clients;
                return [2 /*return*/, clients];
        }
    });
}); };
var getClientsByDoctorId = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var clients;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, getAllClients()];
            case 1:
                clients = _b.sent();
                return [2 /*return*/, (_a = clients.filter) === null || _a === void 0 ? void 0 : _a.call(clients, function (user) { return user.doctorId === String(id); })];
        }
    });
}); };
exports.getClientsByDoctorId = getClientsByDoctorId;
var updateClient = function (updatedClient, doctorId) { return __awaiter(void 0, void 0, void 0, function () {
    var clients, data;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, getAllClients()];
            case 1:
                clients = _b.sent();
                data = (_a = clients === null || clients === void 0 ? void 0 : clients.map) === null || _a === void 0 ? void 0 : _a.call(clients, function (client) { return client.id === updatedClient.id && client.doctorId === doctorId ? __assign(__assign({}, client), updatedClient) :
                    client; });
                return [4 /*yield*/, client.db(dbName).collection(collection)
                        .updateOne({}, { $set: { clients: data } })];
            case 2:
                _b.sent();
                return [2 /*return*/, data.find(function (client) { return client.id === updatedClient.id; })];
        }
    });
}); };
exports.updateClient = updateClient;
var addClient = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var clients;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getAllClients()];
            case 1:
                clients = _a.sent();
                return [4 /*yield*/, client.db(dbName).collection(collection)
                        .updateOne({}, { $set: { clients: __spreadArrays(clients, [data]) } })];
            case 2:
                _a.sent();
                return [2 /*return*/, data];
        }
    });
}); };
exports.addClient = addClient;
var deleteClientById = function (id, doctorId) { return __awaiter(void 0, void 0, void 0, function () {
    var clients, data;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, getAllClients()];
            case 1:
                clients = _b.sent();
                data = (_a = clients === null || clients === void 0 ? void 0 : clients.filter) === null || _a === void 0 ? void 0 : _a.call(clients, function (data) { return data.id !== id && data.doctorId === doctorId; });
                return [4 /*yield*/, client.db(dbName).collection(collection)
                        .updateOne({}, { $set: { clients: data } })];
            case 2:
                _b.sent();
                return [2 /*return*/, data];
        }
    });
}); };
exports.deleteClientById = deleteClientById;
var getClientById = function (id, doctorId) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, client.db(dbName).collection(collection)
                    .findOne()];
            case 1:
                result = (_b.sent()).clients;
                return [2 /*return*/, (_a = result === null || result === void 0 ? void 0 : result.find) === null || _a === void 0 ? void 0 : _a.call(result, function (user) { return user.id === id && user.doctorId === doctorId; })];
        }
    });
}); };
exports.getClientById = getClientById;
