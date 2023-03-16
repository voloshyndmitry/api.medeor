require('dotenv').config()

const isDev = process.env.ENV === 'dev';
const PORT = process.env.PORT || 3002;

const URL: string = isDev ? `http://localhost:${PORT}` : 'https://api-medeor-one.vercel.app';

export default {
    apiUrls: {
        main: '/',
        user: '/user',
        users: '/users',
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
}
