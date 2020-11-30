interface IApiUrls {
    [id: string]: string
}

class Constants {
    private readonly _apiUrls: IApiUrls = {
        main: '/',
        getUser: '/getUser',
        getUserData: '/getUserData',
        getClients: '/getClients',
        getClient: '/getClient',
    }

    get apiUrls() {
        return this._apiUrls
    }
}

export default new Constants;