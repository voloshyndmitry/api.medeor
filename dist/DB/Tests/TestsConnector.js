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
exports.deleteTestById = exports.addTest = exports.updateTest = exports.getTestsGroupByClientId = exports.getTestsByDoctorId = exports.getAllTestGroups = void 0;
var mongoConnect_1 = __importDefault(require("../mongoConnect"));
var TestsGroupTemplateConnector_1 = require("../Templates/TestsGroupTemplateConnector");
var TestsTemplateConnector_1 = require("../Templates/TestsTemplateConnector");
var client = mongoConnect_1.default.client;
var dbName = 'medeordb';
var collection = 'testsGroup';
var getAllTestGroups = function () { return __awaiter(void 0, void 0, void 0, function () {
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
exports.getAllTestGroups = getAllTestGroups;
var getTemplateByTypeId = function (templates, typeId) {
    var _a;
    return (_a = templates === null || templates === void 0 ? void 0 : templates.find) === null || _a === void 0 ? void 0 : _a.call(templates, function (template) { return template.typeId === typeId; });
};
var getTestsByDoctorId = function (id, date) { return __awaiter(void 0, void 0, void 0, function () {
    var tests, groupTemplates, testTemplates, selectedTests, updatedTests;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, getAllTestGroups()];
            case 1:
                tests = _b.sent();
                return [4 /*yield*/, TestsGroupTemplateConnector_1.getAllGroupTemplates()];
            case 2:
                groupTemplates = _b.sent();
                return [4 /*yield*/, TestsTemplateConnector_1.getAllTestTemplates()];
            case 3:
                testTemplates = _b.sent();
                selectedTests = (_a = tests.filter) === null || _a === void 0 ? void 0 : _a.call(tests, function (test) { return test.doctorId === String(id); });
                updatedTests = selectedTests.map(function (test) {
                    var _a, _b;
                    var template = getTemplateByTypeId(groupTemplates, test.typeId) || test;
                    return __assign(__assign(__assign({}, template), test), { tests: ((_b = (_a = test === null || test === void 0 ? void 0 : test.tests) === null || _a === void 0 ? void 0 : _a.map) === null || _b === void 0 ? void 0 : _b.call(_a, function (test) {
                            var testTemplate = getTemplateByTypeId(testTemplates, test === null || test === void 0 ? void 0 : test.typeId);
                            return __assign(__assign({}, testTemplate), test);
                        })) || [] });
                });
                return [2 /*return*/, updatedTests];
        }
    });
}); };
exports.getTestsByDoctorId = getTestsByDoctorId;
var getTestsGroupByClientId = function (doctorId, clientId, date) { return __awaiter(void 0, void 0, void 0, function () {
    var tests;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getTestsByDoctorId(doctorId, date)];
            case 1:
                tests = _a.sent();
                if (clientId) {
                    return [2 /*return*/, tests.filter(function (test) { return test.clientId === clientId; })];
                }
                return [2 /*return*/, tests];
        }
    });
}); };
exports.getTestsGroupByClientId = getTestsGroupByClientId;
var updateTest = function (updatedTest, doctorId) { return __awaiter(void 0, void 0, void 0, function () {
    var tests, data;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, getAllTestGroups()];
            case 1:
                tests = _b.sent();
                data = (_a = tests === null || tests === void 0 ? void 0 : tests.map) === null || _a === void 0 ? void 0 : _a.call(tests, function (test) { return test.id === updatedTest.id ? __assign(__assign({}, test), updatedTest) : client; });
                return [4 /*yield*/, client.db(dbName).collection(collection)
                        .updateOne({}, { $set: { data: data } })];
            case 2:
                _b.sent();
                return [2 /*return*/, data.filter(function (test) { return test.doctorId === doctorId; })];
        }
    });
}); };
exports.updateTest = updateTest;
var addTest = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var tests;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getAllTestGroups()];
            case 1:
                tests = _a.sent();
                return [4 /*yield*/, client.db(dbName).collection(collection)
                        .updateOne({}, { $set: { data: __spreadArrays(tests, [data]) } })];
            case 2:
                _a.sent();
                return [2 /*return*/, data];
        }
    });
}); };
exports.addTest = addTest;
var deleteTestById = function (id, doctorId) { return __awaiter(void 0, void 0, void 0, function () {
    var tests, data;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, getAllTestGroups()];
            case 1:
                tests = _b.sent();
                data = (_a = tests === null || tests === void 0 ? void 0 : tests.filter) === null || _a === void 0 ? void 0 : _a.call(tests, function (data) { return data.id !== id && data.doctorId === doctorId; });
                return [4 /*yield*/, client.db(dbName).collection(collection)
                        .updateOne({}, { $set: { data: data } })];
            case 2:
                _b.sent();
                return [2 /*return*/, data];
        }
    });
}); };
exports.deleteTestById = deleteTestById;
var getTestById = function (id, doctorId) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, client.db(dbName).collection(collection)
                    .findOne()];
            case 1:
                data = (_b.sent()).data;
                return [2 /*return*/, (_a = data === null || data === void 0 ? void 0 : data.find) === null || _a === void 0 ? void 0 : _a.call(data, function (test) { return test.id === id && test.doctorId === doctorId; })];
        }
    });
}); };
