interface IApiUrls {
    [id: string]: string
}

class Constants {
    private readonly _apiUrls: IApiUrls = {
        main: '/',
        user: '/user',
        login: '/login',
        client: '/client',
        clients: '/clients',
        getClients: '/getClients',
        getClient: '/getClient',
    }

    get apiUrls() {
        return this._apiUrls
    }
}

export default new Constants;