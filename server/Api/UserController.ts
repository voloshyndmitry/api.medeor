import { Application, Request, Response } from 'express';
import Constants from '../Constants';
import MongoDb from '../DB/mongoConnect'
import { AutorizeService } from '../Services/AutorizeService';


export class UserController {
    private readonly app: Application;
    private constants = Constants
    private autService: AutorizeService = new AutorizeService
    private dbConnector = MongoDb
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

    private getUserId = async (req: Request, res: Response) => {
        const { query: { login = '', pass = '' } } = req;
        const userId: string = await this.dbConnector.getUserId(String(login), String(pass))
        if (userId) {
            this.autService.setAutorization(req, userId)
        }
        const response = userId ? { userId } : this.defaultError;
        res.json(response)
    }

    private getUserData = async (req: Request, res: Response) => {
        if (!this.autService.checkAutorize(req, res)) { return null }
        const { query: { id } } = req;
        const user = await this.dbConnector.getUserDataById(String(id))
        const response = user || this.defaultError;
        res.json(response)
    }
}