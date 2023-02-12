"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var express_session_1 = __importDefault(require("express-session"));
var compression_1 = __importDefault(require("compression"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var ClientsController_1 = require("./Api/ClientsController");
var TestsController_1 = require("./Api/TestsController");
var MainController_1 = require("./Api/MainController");
var UserController_1 = require("./Api/UserController");
var MailerController_1 = require("./Api/MailerController");
var mongoConnect_1 = __importDefault(require("./DB/mongoConnect"));
require('dotenv').config();
var swaggerDocument = require("../swagger.json");
var isDev = process.env.ENV === 'dev';
var app = express_1.default();
var PORT = process.env.PORT || 3002;
swaggerDocument['host'] = isDev ? "localhost:" + PORT : 'api-medeor.herokuapp.com';
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use(compression_1.default());
app.use(body_parser_1.default.json());
app.use(cors_1.default());
app.set('trust proxy', 1); // trust first proxy
app.use(express_session_1.default({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true, secure: true }
}));
app.use(function (err, req, res, next) {
    if (err) {
        res.status(400).send('error parsing data');
    }
    else {
        next();
    }
});
// app.use(express.static(path.join(__dirname, '../view/dist/view')));
new UserController_1.UserController(app);
new MainController_1.MainController(app);
new ClientsController_1.ClientsController(app);
new TestsController_1.TestController(app);
new MailerController_1.Mailer(app);
mongoConnect_1.default.connect();
process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
    mongoConnect_1.default.close();
});
app.listen(PORT, function () { return console.log("App listening on port " + PORT + "!"); });
