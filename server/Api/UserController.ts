import { Application, Request, Response } from 'express';
import Constants from '../Constants';
import { DBConnector } from '../DB/DBConnector';

export class UrlController {
    private readonly app: Application;
    private constants = Constants
    private dbConnector: DBConnector = new DBConnector
    private defaultError: { error: string } = { error: "Can`t find the user." }
    constructor(app: Application) {
        this.app = app
        this.setRequestHandlers()
    }

    private setRequestHandlers() {
        const { apiUrls: { getUser, getUserData } } = this.constants;
        this.app.get(getUser, this.getUserId)
        this.app.get(getUserData, this.getUserData)
    }

    private getUserId = (req: Request, res: Response) => {
        const { query: { login = '', pass = '' } } = req;
        const userId: string = this.dbConnector.getUserId(String(login), String(pass))
        res.json({ userId } || this.defaultError)
    }

    private getUserData = (req: Request, res: Response) => {
        const { query: { id } } = req;
        const user = this.dbConnector.getUserDataById(String(id))
        res.json({ user } || this.defaultError)
    }
}