import { User } from '../Interfaces/UsersInterface';
import { Application, Request, Response } from 'express';
import Constants from '../Constants';
import MongoDb from '../DB/mongoConnect'
import { AuthorizeService as AuthorizeService } from '../Services/AuthorizeService';
import { addUser, deleteUserById, getAllUsersPublicData, getUserDataById, updateUser } from '../DB/Users/UsersConnector';
import { editUserValidation, userValidation } from '../Helpers/Validation';
import { regMail, sendMail } from '../Helpers/Meiler';


export class UserController {
    private readonly app: Application;
    private constants = Constants
    private autService: AuthorizeService = new AuthorizeService
    private dbConnector = MongoDb
    private defaultError: { error: string } = { error: "Can`t find the user." }
    constructor(app: Application) {
        this.app = app
        this.setRequestHandlers()
    }

    private setRequestHandlers() {
        const { apiUrls: { login, user, users } } = this.constants;
        this.app.get(login, this.getUserId)
        this.app.get(user, this.getUserData)
        this.app.get(users, this.getUsersData)
        // this.app.get(user, this.autService.authenticateToken, this.getUserData)
        // this.app.get(users, this.autService.authenticateToken, this.getUsersData)
        this.app.post(user, this.addUser)
        this.app.put(user, this.autService.authenticateToken, this.updateUser)
        this.app.patch(user, this.autService.authenticateToken, this.updateUser)
        this.app.delete(user, this.autService.authenticateToken, this.deleteUser)
    }

    private getUserId = async (req: Request, res: Response) => {
        const { query: { login = '', pass = '' } } = req;
        const userId: string = await this.dbConnector.getUserId(String(login), String(pass))

        if (userId) {
            const token = this.autService.generateAccessToken(userId);
            return res.json({ userId, token })
        }
        res.json(this.defaultError)
    }

    private getUserData = async (req: Request, res: Response) => {
        const { query: { id } } = req;
        const user = await getUserDataById(String(id))

        if (!user?.error) {
            return res.json(user || this.defaultError)
        }
        res.json(this.defaultError)
    }

    private getUsersData = async (req: Request, res: Response) => {
        try {
            const users = await getAllUsersPublicData()
            return res.json(users ?? this.defaultError)
        } catch(error) {
            console.log("getUsersData error:", error);
            return res.json(this.defaultError)

        }
    }

    private deleteUser = async (req: Request, res: Response) => {
        const { query: { id } } = req;
        const users = await deleteUserById(String(id))

        if (users) {
            return res.json({ users })
        }
        res.json(this.defaultError)
    }

    private generateUserId = (): string => new Date().getTime().toString();

    private addUser = async (req: Request, res: Response) => {
        const { body } = req;

        const user: any = await userValidation(body)

        if (!user?.error) {
            user.id = this.generateUserId()
            try {
                const result = await addUser(user)
                const mailInfo = await sendMail(regMail(user.email));

                return res.json({ ...result, mailInfo })
            } catch (err) {
                return res.json({ status: 'error', message: err })
            }
        }
        res.json(user)
    }

    private updateUser = async (req: Request, res: Response) => {
        const { body } = req;

        const user: any = editUserValidation(body)
        if (!user.error) {

            const result = await updateUser(user as User)
            return res.json(result)
        }
        res.json(user)
    }
}