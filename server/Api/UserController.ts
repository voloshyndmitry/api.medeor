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
        const { apiUrls: { login, user } } = this.constants;
        this.app.get(login, this.getUserId)
        this.app.get(user, this.autService.authenticateToken, this.getUserData)
        this.app.post(user, this.autService.authenticateToken, this.addUser)
        this.app.put(user, this.autService.authenticateToken, this.updateUser)
        this.app.delete(user, this.autService.authenticateToken, this.deleteUser)
    }

    private getUserId = async (req: Request, res: Response) => {
        const { query: { login = '', pass = '' } } = req;
        const userId: string = await this.dbConnector.getUserId(String(login), String(pass))

        if (userId) {
            const token = this.autService.generateAccessToken(userId);
            return res.json({ userId, token })
        }
        res.status(404).json(this.defaultError)
    }

    private getUserData = async (req: Request, res: Response) => {
        const { query: { id } } = req;
        const user = await this.dbConnector.getUserDataById(String(id))

        if (user) {
            return res.json(user)
        }
        res.status(404).json(this.defaultError)
    }

    private deleteUser = async (req: Request, res: Response) => {
        const { body: { id } } = req;
        const users = await this.dbConnector.deleteUserById(String(id))

        if (users) {
            return res.json({ users })
        }
        res.status(400).json(this.defaultError)
    }

    private generateUserId = (): string => new Date().getTime().toString();

    private addUser = async (req: Request, res: Response) => {
        const { body } = req;
        if (this.userValidation(body)) {
            body.id = this.generateUserId()
            const result = await this.dbConnector.addUser(body)

            return res.json(result)
        }
        res.status(409).json({ message: 'Please add all required params: [name, surname, phone, location, specialties]' })
    }
    private updateUser = async (req: Request, res: Response) => {
        const { query } = req;
        if (query?.id) {

            const result = await this.dbConnector.updateUser(query as any)
            return res.json(result)
        }
        res.status(409).json({ message: 'Please add all required params: [name, surname, phone, location, specialties]' })
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