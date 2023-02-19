"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var isDev = process.env.ENV === 'dev';
var PORT = process.env.PORT || 3002;
var URL = isDev ? "http://localhost:" + PORT : 'https://api-medeor-one.vercel.app';
exports.default = {
    apiUrls: {
        main: '/',
        user: '/user',
        login: '/login',
        client: '/client',
        clients: '/clients',
        tests: '/tests',
        testTemplates: '/testTemplates',
        testsGroups: '/testsGroups',
        testGroupTemplates: '/testGroupTemplates',
        getClients: '/getClients',
        getClient: '/getClient',
        sendMail: '/sendMail',
    },
    mailerConfig: {
        SEND_GRID_API_KEY: process.env.SEND_GRID_API_KEY,
        EMAIL_FROM: 'madmweb@gmail.com',
        BASE_URL: URL,
        host: "smtp.gmail.com",
        port: 465,
    }
};
