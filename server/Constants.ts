interface IApiUrls {
    [id: string]: string
}

class Constants {
    private readonly _apiUrls: IApiUrls = {
        getUrl: '/url',
        main: '/'
    }

    get apiUrls() {
        return this._apiUrls
    }
}

export default new Constants;