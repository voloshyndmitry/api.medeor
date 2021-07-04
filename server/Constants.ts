require('dotenv').config()

const isDev = process.env.ENV === 'dev';
const PORT = process.env.PORT || 3002;

const URL: string = isDev ? `http://localhost:${PORT}` : 'https://api-medeor.herokuapp.com';

export default {
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
    },
    mailerConfig: {
        SEND_GRID_API_KEY: process.env.SEND_GRID_API_KEY,
        EMAIL_FROM: 'madmweb@gmail.com',
        BASE_URL: URL
    }
}
