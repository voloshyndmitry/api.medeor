import { Application, Request, Response } from 'express';
import Constants from '../Constants';
import { DBConnector } from '../DB/DBConnector';

export class UrlController {
    private readonly app: Application;
    private constants = Constants
    private dbConnector: DBConnector = new DBConnector

    constructor(app: Application) {
        this.app = app
        this.setRequestHandlers()
    }

    private setRequestHandlers() {
        const { apiUrls: { getUrl } } = this.constants;
        this.app.get(getUrl, this.getUrl)
    }

    private getUrl = (req: Request, res: Response) => {
        const { query: { code = '' } } = req;
        const validCode = String(code).toUpperCase();
        const idData = this.dbConnector.getUrlDataById(validCode)
        const defaultData = { error: "Can`t find the code." }
        res.json(idData || defaultData)
    }
}