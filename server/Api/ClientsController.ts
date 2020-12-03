import { Application, Request, Response } from 'express';
import Constants from '../Constants';
import MongoDb from '../DB/mongoConnect';

export class ClientsController {
    private readonly app: Application;
    private constants = Constants
    private dbConnector = MongoDb
    private defaultError: { error: string } = { error: "Can`t find the client." }

    constructor(app: Application) {
        this.app = app
        this.setRequestHandlers()
    }

    private setRequestHandlers() {
        const { apiUrls: { getClients, getClient } } = this.constants;
        this.app.get(getClients, this.getClients)
        this.app.get(getClient, this.getClient)
    }

    private getClients = async (req: Request, res: Response) => {
        const { query: { id } } = req;
        const clients: any[] = await this.dbConnector.getClientsByDoctorId(String(id))
        const response = clients?.length ? { clients } : this.defaultError;
        res.json(response)
    }

    private getClient = async (req: Request, res: Response) => {
        const { query: { id } } = req;
        const client: any = await this.dbConnector.getClientById(String(id))
        const response = client || this.defaultError;
        res.json(response)
    }
}