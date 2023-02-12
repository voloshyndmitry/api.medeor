"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainController = void 0;
var Constants_1 = __importDefault(require("../Constants"));
var MainController = /** @class */ (function () {
    function MainController(app) {
        this.constants = Constants_1.default;
        this.getUrl = function (req, res) {
            var defaultData = '<h1 style="text-align: center">Hello in MEDEOR!</h1>';
            res.send(defaultData);
        };
        this.app = app;
        this.setRequestHandlers();
    }
    MainController.prototype.setRequestHandlers = function () {
        var main = this.constants.apiUrls.main;
        this.app.get(main, this.getUrl);
    };
    return MainController;
}());
exports.MainController = MainController;
