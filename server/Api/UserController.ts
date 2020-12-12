import { User } from './../Interfaces/Users';
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
        const { apiUrls: { getUser, getUserData, addUser } } = this.constants;
        this.app.get(getUser, this.getUserId)
        this.app.get(getUserData, this.autService.authenticateToken, this.getUserData)
        this.app.post(addUser, this.addUser)
    }

    private getUserId = async (req: Request, res: Response) => {
        const { query: { login = '', pass = '' } } = req;
        const userId: string = await this.dbConnector.getUserId(String(login), String(pass))
        const response: any = userId ? { userId } : this.defaultError;
        if (userId) {
            const token = this.autService.generateAccessToken(userId);
            response.token = token;
        }
        res.json(response)
    }

    private getUserData = async (req: Request, res: Response) => {
        const { query: { id } } = req;
        const user = await this.dbConnector.getUserDataById(String(id))
        const response = user || this.defaultError;
        res.json(response)
    }

    private generateUserId = (): string => new Date().getTime().toString();

    private addUser = async (req: Request, res: Response) => {
        const { body } = req;
        if (this.userValidation(body)) {
            body.id = this.generateUserId()
            const result = await this.dbConnector.addUser(body)

            res.json(result)
        } else {
            res.status(409).json({ message: 'Please add all required params: [name, surname, phone, location, specialties]' })
        }
    }

    private userValidation = (user: User) => {
        const {
            name,
            surname,
            phone,
            location,
            specialties,
            email,
            pass
        } = user;

        if (!name ||
            !surname ||
            !email ||
            !pass ||
            !phone ||
            !location ||
            !specialties) {
            return false
        }
        return true
    }
}