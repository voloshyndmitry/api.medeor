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
exports.editUserValidation = exports.userValidation = exports.clientValidation = exports.testGroupValidation = void 0;
var isEmail_1 = __importDefault(require("validator/lib/isEmail"));
var isMobilePhone_1 = __importDefault(require("validator/lib/isMobilePhone"));
var UsersConnector_1 = require("../DB/Users/UsersConnector");
var ErrorType;
(function (ErrorType) {
    ErrorType["REQUIRED"] = "required";
    ErrorType["VALIDATION"] = "validation";
    ErrorType["EXIST"] = "exist";
})(ErrorType || (ErrorType = {}));
var EMessage;
(function (EMessage) {
    EMessage["NAME"] = "name";
    EMessage["SUR_NAME"] = "surName";
    EMessage["EMAIL"] = "email";
    EMessage["SEX"] = "sex";
    EMessage["BIRTHDAY"] = "birthday";
    EMessage["PHONE"] = "phone";
    EMessage["PASS"] = "pass";
    EMessage["ID"] = "id";
    EMessage["TYPE_ID"] = "typeId";
    EMessage["CLIENT_ID"] = "clientId";
    EMessage["DOCTOR_ID"] = "doctorId";
    EMessage["TESTS"] = "tests";
    EMessage["DATE"] = "date";
    EMessage["VALUE"] = "value";
})(EMessage || (EMessage = {}));
var errorMessage = {
    required: {
        name: 'Name is required',
        surName: 'Surname is required',
        email: 'Email is required',
        sex: 'Sex is required',
        birthday: 'birthday is required',
        phone: 'Phone is required',
        pass: 'Pass is required',
        id: 'Id is required',
        typeId: 'TypeId is required',
        clientId: 'ClientId is required',
        doctorId: 'DoctorId is required',
        tests: 'Tests is required',
        date: 'Date is required',
        value: 'Value is required'
    },
    validation: {
        phone: 'Phone number is not valid',
        email: 'Email is not valid',
        tests: 'Test is not valid'
    },
    exist: {
        email: "An account with this email already exists "
    }
};
var getError = function (type, message) {
    var _a;
    return { error: ((_a = errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage[type]) === null || _a === void 0 ? void 0 : _a[message]) || "Validation error: " + message };
};
var testGroupValidation = function (props) {
    var id = props.id, typeId = props.typeId, clientId = props.clientId, doctorId = props.doctorId, tests = props.tests, date = props.date;
    if (!id) {
        return getError(ErrorType.REQUIRED, EMessage.ID);
    }
    if (!typeId) {
        return getError(ErrorType.REQUIRED, EMessage.TYPE_ID);
    }
    if (!clientId) {
        return getError(ErrorType.REQUIRED, EMessage.CLIENT_ID);
    }
    if (!doctorId) {
        return getError(ErrorType.REQUIRED, EMessage.DOCTOR_ID);
    }
    if (!date) {
        return getError(ErrorType.REQUIRED, EMessage.DATE);
    }
    if (!tests || !(tests === null || tests === void 0 ? void 0 : tests.length)) {
        return getError(ErrorType.REQUIRED, EMessage.TESTS);
    }
    if (tests.some(testValidation)) {
        return getError(ErrorType.VALIDATION, EMessage.TESTS);
    }
    return {
        id: id,
        typeId: typeId,
        clientId: clientId,
        doctorId: doctorId,
        tests: tests.map(updateTest),
        date: date
    };
};
exports.testGroupValidation = testGroupValidation;
var testValidation = function (props) {
    var typeId = props.typeId, value = props.value;
    if (!typeId) {
        return getError(ErrorType.REQUIRED, EMessage.TYPE_ID);
    }
    if (!value) {
        return getError(ErrorType.REQUIRED, EMessage.VALUE);
    }
    return false;
};
var updateTest = function (test) {
    return __assign(__assign({}, test), { id: String(new Date().getTime()) });
};
var clientValidation = function (client) {
    var id = client.id, doctorId = client.doctorId, name = client.name, surname = client.surname, sex = client.sex, birthday = client.birthday, _a = client.pregnancy, pregnancy = _a === void 0 ? '' : _a, phone = client.phone, email = client.email, _b = client.photo, photo = _b === void 0 ? '' : _b, _c = client.tags, tags = _c === void 0 ? [] : _c;
    if (!name) {
        return getError(ErrorType.REQUIRED, EMessage.NAME);
    }
    if (!surname) {
        return getError(ErrorType.REQUIRED, EMessage.SUR_NAME);
    }
    if (!sex) {
        return getError(ErrorType.REQUIRED, EMessage.SEX);
    }
    if (!birthday) {
        return getError(ErrorType.REQUIRED, EMessage.BIRTHDAY);
    }
    if (!phone) {
        return getError(ErrorType.REQUIRED, EMessage.PHONE);
    }
    if (!email) {
        return getError(ErrorType.REQUIRED, EMessage.EMAIL);
    }
    if (!isMobilePhone_1.default(phone)) {
        return getError(ErrorType.VALIDATION, EMessage.PHONE);
    }
    if (!isEmail_1.default(email)) {
        return getError(ErrorType.VALIDATION, EMessage.EMAIL);
    }
    return {
        id: id,
        doctorId: doctorId,
        name: name,
        surname: surname,
        sex: sex,
        birthday: birthday,
        pregnancy: pregnancy,
        phone: phone,
        email: email,
        photo: photo,
        tags: tags
    };
};
exports.clientValidation = clientValidation;
var userValidation = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var id, name, surname, _a, phone, _b, location, _c, specialties, email, pass;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                id = user.id, name = user.name, surname = user.surname, _a = user.phone, phone = _a === void 0 ? '' : _a, _b = user.location, location = _b === void 0 ? '' : _b, _c = user.specialties, specialties = _c === void 0 ? '' : _c, email = user.email, pass = user.pass;
                if (!name) {
                    return [2 /*return*/, getError(ErrorType.REQUIRED, EMessage.NAME)];
                }
                if (!surname) {
                    return [2 /*return*/, getError(ErrorType.REQUIRED, EMessage.SUR_NAME)];
                }
                if (!email) {
                    return [2 /*return*/, getError(ErrorType.REQUIRED, EMessage.EMAIL)];
                }
                return [4 /*yield*/, UsersConnector_1.isUserEmailExist(email)];
            case 1:
                if (_d.sent()) {
                    return [2 /*return*/, getError(ErrorType.EXIST, EMessage.EMAIL)];
                }
                if (!phone) {
                    return [2 /*return*/, getError(ErrorType.VALIDATION, EMessage.PHONE)];
                }
                // if (phone && !isPhone(phone)) { return getError(ErrorType.VALIDATION, EMessage.PHONE) }
                if (!isEmail_1.default(email)) {
                    return [2 /*return*/, getError(ErrorType.VALIDATION, EMessage.EMAIL)];
                }
                return [2 /*return*/, {
                        id: id,
                        name: name,
                        surname: surname,
                        phone: phone,
                        location: location,
                        specialties: specialties,
                        email: email,
                        pass: pass,
                    }];
        }
    });
}); };
exports.userValidation = userValidation;
var editUserValidation = function (user) {
    var id = user.id, email = user.email;
    if (!id) {
        return getError(ErrorType.REQUIRED, EMessage.ID);
    }
    // if (phone && !isPhone(phone)) { return getError(ErrorType.VALIDATION, EMessage.PHONE) }
    if (email && !isEmail_1.default(email)) {
        return getError(ErrorType.VALIDATION, EMessage.EMAIL);
    }
    return user;
};
exports.editUserValidation = editUserValidation;
