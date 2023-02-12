"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testGroupTemplateFormatting = exports.testTemplateFormatting = void 0;
var testTemplateFormatting = function (data) {
    var typeId = data.typeId, code = data.code, _a = data.refValue, refValue = _a === void 0 ? {} : _a, _b = data.title, title = _b === void 0 ? {} : _b, _c = data.description, description = _c === void 0 ? {} : _c, _d = data.unit, unit = _d === void 0 ? {} : _d;
    return {
        typeId: "" + code + new Date().getTime().toString(),
        id: '',
        code: code,
        value: '',
        refValue: refValue,
        title: title,
        description: description,
        unit: unit
    };
};
exports.testTemplateFormatting = testTemplateFormatting;
var testGroupTemplateFormatting = function (data) {
    var name = data.name, description = data.description, _a = data.tests, tests = _a === void 0 ? [] : _a;
    return {
        typeId: new Date().getTime().toString(),
        id: '',
        date: '',
        clientId: '',
        doctorId: '',
        name: name,
        description: description,
        tests: tests.map(function (_a) {
            var typeId = _a.typeId;
            return ({ typeId: typeId });
        }).filter(function (test) { return test; })
    };
};
exports.testGroupTemplateFormatting = testGroupTemplateFormatting;
