"use strict";
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
exports.TestController = void 0;
var Validation_1 = require("./../Helpers/Validation");
var Constants_1 = __importDefault(require("../Constants"));
var AuthorizeService_1 = require("../Services/AuthorizeService");
var TestsConnector_1 = require("../DB/Tests/TestsConnector");
var TestsTemplateConnector_1 = require("../DB/Templates/TestsTemplateConnector");
var TestsGroupTemplateConnector_1 = require("../DB/Templates/TestsGroupTemplateConnector");
var DataFormating_1 = require("../Helpers/DataFormating");
var TestController = /** @class */ (function () {
    function TestController(app) {
        var _this = this;
        this.autService = new AuthorizeService_1.AuthorizeService;
        this.defaultError = { error: "Can`t find the testGroup." };
        this.getTestsGroupByClientId = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, clientId, _c, date, _d, doctorId, _e, userId, testsGroups;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _a = req.query, _b = _a.clientId, clientId = _b === void 0 ? '' : _b, _c = _a.date, date = _c === void 0 ? '' : _c, _d = _a.doctorId, doctorId = _d === void 0 ? '' : _d, _e = req.userId, userId = _e === void 0 ? '' : _e;
                        return [4 /*yield*/, TestsConnector_1.getTestsGroupByClientId(String(doctorId), String(clientId), String(date))];
                    case 1:
                        testsGroups = _f.sent();
                        return [2 /*return*/, res.json((testsGroups === null || testsGroups === void 0 ? void 0 : testsGroups.length) ? { data: testsGroups } : this.defaultError)];
                }
            });
        }); };
        this.getAllTestTemplates = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var testTemplates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, TestsTemplateConnector_1.getAllTestTemplates()];
                    case 1:
                        testTemplates = _a.sent();
                        return [2 /*return*/, res.json((testTemplates === null || testTemplates === void 0 ? void 0 : testTemplates.length) ? { data: testTemplates } : this.defaultError)];
                }
            });
        }); };
        this.addTestTemplate = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var body, testTemplate, testTemplates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = req.body;
                        testTemplate = DataFormating_1.testTemplateFormatting(body);
                        return [4 /*yield*/, TestsTemplateConnector_1.addTestTemplate(testTemplate)];
                    case 1:
                        testTemplates = _a.sent();
                        return [2 /*return*/, res.json((testTemplates === null || testTemplates === void 0 ? void 0 : testTemplates.length) ? { data: testTemplates } : this.defaultError)];
                }
            });
        }); };
        this.deleteTestTemplate = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, typeId, testTemplates;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.query.typeId, typeId = _a === void 0 ? '' : _a;
                        return [4 /*yield*/, TestsTemplateConnector_1.deleteTestTemplate(String(typeId))];
                    case 1:
                        testTemplates = _b.sent();
                        return [2 /*return*/, res.json((testTemplates === null || testTemplates === void 0 ? void 0 : testTemplates.length) ? { data: testTemplates } : this.defaultError)];
                }
            });
        }); };
        this.getTestGroupTemplates = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var testsGroupTemplates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, TestsGroupTemplateConnector_1.getAllGroupTemplates()];
                    case 1:
                        testsGroupTemplates = _a.sent();
                        return [2 /*return*/, res.json((testsGroupTemplates === null || testsGroupTemplates === void 0 ? void 0 : testsGroupTemplates.length) ? { data: testsGroupTemplates } : this.defaultError)];
                }
            });
        }); };
        this.addTestGroupTemplates = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var body, testGroupTemplate, testGroupTemplates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = req.body;
                        testGroupTemplate = DataFormating_1.testGroupTemplateFormatting(body);
                        return [4 /*yield*/, TestsGroupTemplateConnector_1.addTestGroupTemplate(testGroupTemplate)];
                    case 1:
                        testGroupTemplates = _a.sent();
                        res.json(testGroupTemplates);
                        return [2 /*return*/];
                }
            });
        }); };
        this.deleteTestGroupTemplates = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, typeId, testGroupTemplates;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.query.typeId, typeId = _a === void 0 ? '' : _a;
                        return [4 /*yield*/, TestsGroupTemplateConnector_1.deleteTestGroupTemplate(String(typeId))];
                    case 1:
                        testGroupTemplates = _b.sent();
                        return [2 /*return*/, res.json((testGroupTemplates === null || testGroupTemplates === void 0 ? void 0 : testGroupTemplates.length) ? { data: testGroupTemplates } : this.defaultError)];
                }
            });
        }); };
        this.createTestGroup = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var body, test;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = req.body;
                        test = Validation_1.testGroupValidation(body);
                        if (test.error) {
                            return [2 /*return*/, res.json(test)];
                        }
                        return [4 /*yield*/, TestsConnector_1.addTest(test)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.app = app;
        this.setRequestHandlers();
    }
    TestController.prototype.setRequestHandlers = function () {
        var _a = Constants_1.default.apiUrls, tests = _a.tests, testsGroups = _a.testsGroups, testTemplates = _a.testTemplates, testGroupTemplates = _a.testGroupTemplates;
        // this.app.get(tests, this.getTestsGroupByClientId)
        this.app.get(testsGroups, this.getTestsGroupByClientId);
        // TestTemplates:
        this.app.get(testTemplates, this.getAllTestTemplates);
        this.app.post(testTemplates, this.addTestTemplate);
        this.app.delete(testTemplates, this.deleteTestTemplate);
        // TestGroupTemplates:
        this.app.get(testGroupTemplates, this.getTestGroupTemplates);
        this.app.post(testGroupTemplates, this.addTestGroupTemplates);
        this.app.delete(testGroupTemplates, this.deleteTestGroupTemplates);
        this.app.post(testsGroups, this.createTestGroup);
    };
    return TestController;
}());
exports.TestController = TestController;
