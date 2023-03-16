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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
exports.getAllUsersPublicData = exports.isUserEmailExist = exports.deleteUserById = exports.updateUser = exports.addUser = exports.getUserDataById = exports.getAllAuthData = void 0;
var mongoConnect_1 = __importDefault(require("../mongoConnect"));
var client = mongoConnect_1.default.client;
var dbName = 'medeordb';
var clientsCollection = "clients";
var autDataCollection = "autData";
var usersCollection = "users";
var printUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.db(dbName).collection(clientsCollection)
                    .find().toArray()];
            case 1:
                result = _a.sent();
                if (result) {
                    console.log('result:');
                    result.map(function (client) { return console.log(client); });
                }
                return [2 /*return*/];
        }
    });
}); };
var getUserDataById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getAllUsers()];
            case 1:
                result = (_a.sent()).data;
                return [2 /*return*/, result.find(function (user) { return user.id === id; })];
        }
    });
}); };
exports.getUserDataById = getUserDataById;
var getAllAuthData = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, client.db(dbName).collection(autDataCollection)
                .findOne()];
    });
}); };
exports.getAllAuthData = getAllAuthData;
var isUserEmailExist = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var userIds;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getAllAuthData()];
            case 1:
                userIds = (_a.sent()).data;
                return [2 /*return*/, userIds.find(function (_a) {
                        var _b = _a.login, login = _b === void 0 ? '' : _b;
                        return login === email;
                    })];
        }
    });
}); };
exports.isUserEmailExist = isUserEmailExist;
var addUser = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var userIds, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getAllAuthData()];
            case 1:
                userIds = (_a.sent()).data;
                return [4 /*yield*/, getAllUsers()];
            case 2:
                data = (_a.sent()).data;
                return [4 /*yield*/, client.db(dbName).collection(autDataCollection)
                        .updateOne({}, { $set: { data: __spreadArrays(userIds, [{ login: user.email, pass: user.pass, id: user.id }]) } })];
            case 3:
                _a.sent();
                return [4 /*yield*/, client.db(dbName).collection(usersCollection)
                        .updateOne({}, { $set: { data: __spreadArrays(data, [user]) } })];
            case 4:
                _a.sent();
                return [2 /*return*/, user];
        }
    });
}); };
exports.addUser = addUser;
var deleteUserById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var result, usersFilter, users, autData, filtereAutData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getAllUsers()];
            case 1:
                result = (_a.sent()).data;
                usersFilter = function (user) { return user.id !== id; };
                users = result.filter(usersFilter);
                return [4 /*yield*/, client.db(dbName).collection(usersCollection)
                        .updateOne({}, { $set: { data: users } })];
            case 2:
                _a.sent();
                return [4 /*yield*/, getAllAuthData()];
            case 3:
                autData = (_a.sent()).data;
                filtereAutData = autData.filter(usersFilter);
                return [4 /*yield*/, client.db(dbName).collection(autDataCollection)
                        .updateOne({}, { $set: { data: filtereAutData } })];
            case 4:
                _a.sent();
                return [2 /*return*/, users];
        }
    });
}); };
exports.deleteUserById = deleteUserById;
var getAllUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, client.db(dbName).collection(usersCollection)
                .findOne()];
    });
}); };
var getAllUsersPublicData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getAllUsers()];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data.map(function (item) {
                        var pass = item.pass, publicUserData = __rest(item, ["pass"]);
                        return publicUserData;
                    })];
        }
    });
}); };
exports.getAllUsersPublicData = getAllUsersPublicData;
var updateUser = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var data, updatedUsers, userIds, newUserIds;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getAllUsers()];
            case 1:
                data = (_a.sent()).data;
                updatedUsers = data.map(function (item) {
                    if (item.id === user.id) {
                        return __assign(__assign({}, item), user);
                    }
                    return item;
                });
                if (!(user.email || user.pass)) return [3 /*break*/, 4];
                return [4 /*yield*/, getAllAuthData()];
            case 2:
                userIds = (_a.sent()).data;
                newUserIds = userIds.map(function (item) {
                    if (item.id === user.id) {
                        return __assign(__assign({}, item), { pass: user.pass || item.pass, login: user.email || item.login });
                    }
                    return item;
                });
                return [4 /*yield*/, client.db(dbName).collection(autDataCollection)
                        .updateOne({}, { $set: { data: newUserIds } })];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [4 /*yield*/, client.db(dbName).collection(usersCollection)
                    .updateOne({}, { $set: { data: updatedUsers } })];
            case 5:
                _a.sent();
                return [2 /*return*/, updatedUsers.find(function (_a) {
                        var id = _a.id;
                        return id === user.id;
                    })];
        }
    });
}); };
exports.updateUser = updateUser;
