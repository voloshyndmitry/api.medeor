import express, { NextFunction, Request, Response } from "express";
import swaggerUi from 'swagger-ui-express';
import session from 'express-session';
import compression from 'compression';
import bodyParser from 'body-parser';
import cors from 'cors';

import { ClientsController } from "./Api/ClientsController";
import { TestController } from "./Api/TestsController";
import { MainController } from "./Api/MainController";
import { UserController } from './Api/UserController'
import { Mailer } from "./Api/MailerController";
import MongoDb from './DB/mongoConnect'

require('dotenv').config()

const swaggerDocument: { [name: string]: any } = require("../swagger.json");


const isDev = process.env.ENV === 'dev';

const app = express();
const PORT = process.env.PORT || 3002;

swaggerDocument['host'] = isDev ? `localhost:${PORT}` : 'api-medeor.herokuapp.com';

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(compression())
app.use(bodyParser.json())
app.use(cors())
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true, secure: true }
}))
app.use((err: string, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        res.status(400).send('error parsing data')
    } else {
        next()
    }
})
// app.use(express.static(path.join(__dirname, '../view/dist/view')));

new UserController(app)
new MainController(app)
new ClientsController(app)
new TestController(app)
new Mailer(app)

MongoDb.connect();

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
    MongoDb.close();
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
