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
exports.deleteTestGroupTemplate = exports.updateTestGroupTemplate = exports.addTestGroupTemplate = exports.getTemplateByTypeId = exports.getAllGroupTemplates = void 0;
var mongoConnect_1 = __importDefault(require("../mongoConnect"));
var client = mongoConnect_1.default.client;
var dbName = 'medeordb';
var collection = 'testsGroupTemplate';
var getAllGroupTemplates = function () { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.db(dbName).collection(collection)
                    .findOne()];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
        }
    });
}); };
exports.getAllGroupTemplates = getAllGroupTemplates;
var getTemplateByTypeId = function (typeId) { return __awaiter(void 0, void 0, void 0, function () {
    var templates;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getAllGroupTemplates()];
            case 1:
                templates = _a.sent();
                return [2 /*return*/, templates.find(function (template) { return template.typeId === typeId; })];
        }
    });
}); };
exports.getTemplateByTypeId = getTemplateByTypeId;
var addTestGroupTemplate = function (template) { return __awaiter(void 0, void 0, void 0, function () {
    var data, newTests;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getAllGroupTemplates()];
            case 1:
                data = _a.sent();
                newTests = __spreadArrays(data, [template]);
                return [4 /*yield*/, client.db(dbName).collection(collection)
                        .updateOne({}, { $set: { data: newTests } })];
            case 2:
                _a.sent();
                return [2 /*return*/, newTests];
        }
    });
}); };
exports.addTestGroupTemplate = addTestGroupTemplate;
var updateTestGroupTemplate = function (template) { return __awaiter(void 0, void 0, void 0, function () {
    var data, newTests;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getAllGroupTemplates()];
            case 1:
                data = _a.sent();
                newTests = data.map(function (test) { return test.typeId === template.typeId ? __assign(__assign({}, test), template) : test; });
                return [4 /*yield*/, client.db(dbName).collection(collection)
                        .updateOne({}, { $set: { data: newTests } })];
            case 2:
                _a.sent();
                return [2 /*return*/, newTests];
        }
    });
}); };
exports.updateTestGroupTemplate = updateTestGroupTemplate;
var deleteTestGroupTemplate = function (typeId) { return __awaiter(void 0, void 0, void 0, function () {
    var data, newTests;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getAllGroupTemplates()];
            case 1:
                data = _a.sent();
                newTests = data.filter(function (test) { return test.typeId !== typeId; });
                return [4 /*yield*/, client.db(dbName).collection(collection)
                        .updateOne({}, { $set: { data: newTests } })];
            case 2:
                _a.sent();
                return [2 /*return*/, newTests];
        }
    });
}); };
exports.deleteTestGroupTemplate = deleteTestGroupTemplate;
