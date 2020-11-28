interface IApiUrls {
    [id: string]: string
}

class Constants {
    private readonly _apiUrls: IApiUrls = {
        main: '/',
        getUser: '/getUser',
        getUserData: '/getUserData',
    }

    get apiUrls() {
        return this._apiUrls
    }
}

export default new Constants;